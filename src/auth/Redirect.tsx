"use client";

import { signIn } from "next-auth/react";
import { useEffect } from "react";

// Unfortunately Next-auth doesnt provide a way to do this on the server
// so we need to make a client component and wait for hydration...
// TODO: relook this in the future
export default function Redirect() {
  useEffect(() => {
    void signIn("discord");
  });

  return <h1 className="">redirecting...</h1>;
}
