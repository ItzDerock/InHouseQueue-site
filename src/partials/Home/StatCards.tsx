import StatCard from "../../components/StatCard/StatCard";

export default function StatCards() {
  return (
    <div className="relative w-full z-30">
      <div className="flex -translate-y-24 flex-row flex-wrap z-30 w-full align-middle justify-center gap-9">
        <StatCard
          count={250}
          label="Servers"
          aosIndex={0}
        />

        <StatCard
          count={4500}
          label="Users"
          aosIndex={1}
        />

        <StatCard
          count={50000}
          label="Matches Played"
          aosIndex={2}
        />
      </div>
    </div>
  )
}