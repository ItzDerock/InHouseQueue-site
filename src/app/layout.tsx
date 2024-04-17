import React, { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";
import banner from "../assets/banner.webp";
import AOSInit from "../components/AOSInit";
import Footer from "../partials/Footer";

// get the tailwind config for colors
const config = resolveConfig(tailwindConfig);

// import global styles
import "../styles/globals.css";

// viewport details
export const viewport: Viewport = {
  themeColor: (config.theme?.colors as unknown as Record<string, string>)?.primary as string,
  width: "device-width",
  initialScale: 1,
}

// default site metadata
// see https://nextjs.org/docs/app/api-reference/functions/generate-metadata for details
export const metadata: Metadata = {
  title: "In-House Queue",
  description:
    "In-House Queue: A Discord Bot designed to organize In-House custom games",
  twitter: {
    card: "summary_large_image",
  },

  openGraph: {
    title: "In-House Queue",
    description:
      "In-House Queue: A Discord Bot designed to organize In-House custom games",
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap"
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
