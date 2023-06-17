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

    const data: IStatsProps = await fetch("https://health.inhousequeue.xyz/health", { headers: header })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err))

    setStats(data)
  };

  React.useEffect(() => { fetchStats() }, [])

  return (
    <div className="relative w-full z-30">
      <div className="flex -translate-y-24 flex-row flex-wrap z-30 w-full align-middle justify-center gap-9">
        <StatCard
          count={stats?.server_count ?? 700}
          label="Servers"
          aosIndex={0}
        />

        <StatCard
          count={stats?.total_users ?? 12000}
          label="Active Players"
          aosIndex={1}
        />

        <StatCard
          count={stats?.total_games ?? 10000}
          label="Matches Played"
          aosIndex={2}
        />
      </div>
    </div>
  )
}