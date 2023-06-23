import React, { Suspense } from "react";
import type { Metadata } from "next";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";
import banner from "../assets/banner.webp";
import AOSInit from "../components/AOSInit";
import Footer from "../partials/Footer";

// get the tailwind config for colors
const config = resolveConfig(tailwindConfig);

// import global styles
import "../styles/globals.css";

// default site metadata
// see https://nextjs.org/docs/app/api-reference/functions/generate-metadata for details
export const metadata: Metadata = {
  title: "In-House Queue",
  viewport: "width=device-width, initial-scale=1",
  themeColor: config.theme?.colors?.primary as string,
  description:
    "In-House Queue: A Discord Bot designed to organize In-House custom games for League of Legends, Overwatch, and Valorant.",
  twitter: {
    card: "summary_large_image",
  },

  openGraph: {
    title: "In-House Queue",
    description:
      "In-House Queue: A Discord Bot designed to organize In-House custom games for League of Legends, Overwatch, and Valorant.",
    images: [
      {
        url: banner.src,
      },
    ],
  },
};

// the main layout for the app
export default function App({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>

      {/* page content */}
      <body className="bg-background-main">
        <Suspense>{children}</Suspense>

        {/* footer */}
        <Footer />
      </body>

      {/* initalize aos */}
      <AOSInit />
    </html>
  );
}
