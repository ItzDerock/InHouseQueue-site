import type { NextRequest } from "next/server";
import { env } from "../../../env.mjs";
import { revalidateTag } from "next/cache";

export const POST = (request: NextRequest) => {
  if (request.headers.get("Authorization") !== env.INVALIDATE_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }

  revalidateTag("stats");
  console.log("Revalidated stats tag");
  return new Response("OK", { status: 200 });
}
