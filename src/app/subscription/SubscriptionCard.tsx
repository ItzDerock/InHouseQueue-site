import type { ReactNode } from "react";

export default function SubscriptionCard(props: { children: ReactNode }) {
  return (
    <div className="rounded-sm bg-background-accent p-4">{props.children}</div>
  );
}
