"use client";

import React from "react";

import StatCard from "../../components/StatCard/StatCard";

interface IStatsProps {
  status: string;
  last_check: string;
  message: string;
  server_count: number;
  total_games: number;
  total_users: number;
}

export default function StatCards() {
  const [stats, setStats] = React.useState<IStatsProps | undefined>();

  const fetchStats = async () => {
    const header = {
      "method": "GET",
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json"
    };

    try {
      const res = await fetch("https://health.inhousequeue.xyz/health", { headers: header });
      const data = await res.json() as IStatsProps; // Type assertion here
      setStats(data);
    } catch(err) {
      console.log(err);
      setStats({
        status: "unoperational",
        last_check: "",
        message: "",
        server_count: 700,
        total_games: 10000,
        total_users: 12000
      })
    }
  };

  React.useEffect(() => {
    void fetchStats();
  }, [])

  return (
    <div className="relative w-full z-30">
      <div className="flex -translate-y-24 flex-row flex-wrap z-30 w-full align-middle justify-center gap-9">
        <StatCard
          count={stats?.server_count ?? 0}
          label="Servers"
          aosIndex={0}
        />

        <StatCard
          count={stats?.total_users ?? 0}
          label="Active Players"
          aosIndex={1}
        />

        <StatCard
          count={stats?.total_games ?? 0}
          label="Matches Played"
          aosIndex={2}
        />
      </div>
    </div>
  )
}