import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

/**
 * Header that gives the user an option to log out
 * @returns
 */
export default function AuthHeader() {
  const { data: session } = useSession();

  return (
    <header className="w-full flex flex-row flex-wrap items-center text-sm md:text-lg text-white gap-3 align-middle justify-center py-2 bg-black">
      <p>Currently authenticated as </p>
      <div className="flex flex-row gap-2 items-center">
        {session ? (
          <>
            <Image
              className="rounded-full"
              src={session.user.image}
              width={32}
              height={32}
              loading="eager"
              alt="User Avatar"
            />
            <p className="font-bold">{session.user.name}</p>
          </>
        ) : (
          // loading skeleton
          <>
            <div className="w-8 h-8 rounded-full bg-background-accent animate-pulse"></div>
            <div className="w-24 h-6 bg-background-accent animate-pulse"></div>
          </>
        )}
      </div>
      <a
        onClick={(event) => {
          event.preventDefault();
          signOut().catch((error) => {
            console.error("Failed to sign out", error);
            alert("Unable to sign you out. Please try again later.");
          });
        }}
        className="text-primary underline md:text-sm text-xs cursor-pointer"
      >
        (Not you?)
      </a>
    </header>
  );
}
