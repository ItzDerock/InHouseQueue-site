import { env } from "./env.mjs";

export function register() {
  // wait for stats service to be ready, then revalidate stats data
  void waitForStatsService().finally(() => void attemptSelfRevalidation());
}

/**
 * Polls the STATS_ENDPOINT until it's ready, at a max of 10 attempts
 * @param attempt
 * @returns
 */
async function waitForStatsService(attempt = 0) {
  if (attempt > 10) {
    console.log(
      "[warn] Stats service not ready after 10 attempts! Using stale data.",
    );
    return false;
  }

  try {
    await fetch(env.STATS_ENDPOINT);
    return true;
  } catch (err) {
    console.log("[debug] Stats service not ready, retrying...");

    return new Promise((resolve) => {
      setTimeout(() => {
        waitForStatsService(attempt + 1)
          .then(() => resolve(true))
          .catch(() => resolve(true));
      }, attempt * 150);
    });
  }
}

/**
 * Makes an API call to the src/apps/api/revalidate/route.ts
 * Used to mark certain data (i.e. stats) as stale since they were generated at build time
 * Follows up with a request to the homepage to trigger a regeneration
 * Not the nicest solution, but Next.JS doesn't allow invalidateTag to run
 * @param attempt
 * @returns
 */
async function attemptSelfRevalidation(attempt = 0) {
  console.log(`Attempt ${attempt} to revalidate.`);

  if (attempt > 10) {
    console.log("Max attempts reached, no longer revalidating");
    return;
  }

  try {
    // PORT environment variable is automatically set by Next.JS, even if not explicitly defined or if --port CLI flag is used.
    await fetch(
      `http://127.0.0.1:${process.env.PORT ?? "3000"}/api/invalidate`,
      {
        method: "POST",
        headers: {
          Authorization: env.INVALIDATE_SECRET,
        },
      },
    )
      .then((res) => res.text())
      .then((data) => console.log(data));

    // Next.JS only allows for invalidation, so we must make a request to trigger Next.JS to regenerate the page
    await fetch(`http://127.0.0.1:${process.env.PORT ?? "3000"}/`);
  } catch (err) {
    console.log("Failed to revalidate");
    console.error(err);

    setTimeout(() => void attemptSelfRevalidation(attempt + 1), attempt * 100);
  }
}
