'use client';

import { useEffect, useMemo, useState } from "react";

export default function NumberCounter({ number, enabled }: {
  number: number;
  enabled?: boolean;
}) {
  // number formatter based on the user's locale
  const formatter = useMemo(() => 
    new Intl.NumberFormat(typeof navigator !== "undefined" ? navigator.language : "en-US", {
      notation: "compact",
      // with at least 1 decimal place if the number is bigger than 1000
      minimumFractionDigits: number > 1000 ? 1 : 0,
      maximumFractionDigits: 1
    }), [number]
  );

  // keep track of the current number
  const [currentNumber, setCurrentNumber] = useState(0);

  // update the current number
  useEffect(() => {
    // only run if the counter is enabled
    if (!enabled)
      return;

    // only run if the current number is less than the number
    if (currentNumber >= number)
      return;

    // get the amount to increment by
    const increment = Math.ceil(number / 30);

    // create a timeout to increment the number
    const timer = setTimeout(() => {
      // calculate the new number
      let newNumber = currentNumber + increment;

      // if the new number is greater than the number, set the new number to the number
      if (newNumber > number)
        newNumber = number;

      // increment the current number
      setCurrentNumber(newNumber);
    }, 100);

    // clear the timer when the component unmounts
    return () => clearInterval(timer);
  }, [currentNumber, number, enabled]);

  // if disabled, return the formatted number
  if (!enabled)
    return <>{formatter.format(number)}</>;

  // return the formatted number
  return <>{formatter.format(currentNumber)}</>;
}