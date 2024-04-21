"use client";

import React from "react";

import StatCard from "../../components/StatCard/StatCard";

export default function StatCards() {
  // Directly use the hardcoded values in your JSX
  return (
    <div className="relative z-30 mb-8 w-full">
      <div className="z-30 flex w-full flex-row flex-wrap justify-center gap-9 align-middle md:-translate-y-24">
        <StatCard
          count={2000}
          label="Servers"
          aosIndex={0}
        />
        <StatCard
          count={24000}
          label="Active Players"
          aosIndex={1}
        />
        <StatCard
          count={50000}
          label="Matches Played"
          aosIndex={2}
        />
      </div>
    </div>
  );
}

