import React, { Suspense } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config.cjs";
import banner from "../assets/banner.webp";
import AOSInit from "../components/AOSInit";

// get the tailwind config for colors
const config = resolveConfig(tailwindConfig);

// import global styles
import "../styles/globals.css";

// the main layout for the app
export default function App({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Page Title */}
        <title>In-House Queue</title>

        {/* Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="In-House Queue" />
        <meta name="theme-color" content={config.theme?.colors?.primary as string} />
        
        {/* discord embed / twitter card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:title" content="In-House Queue" />
        <meta property="og:description" content="In-House Queue" />
        <meta property="og:image" content={banner.src} />

        {/* favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap" rel="stylesheet" />
      </head>

      {/* page content */}
      <body className="bg-background-main">
        <Suspense>
          {children}
        </Suspense>
      </body>

      {/* initalize aos */}
      <AOSInit />
    </html>
  );
}