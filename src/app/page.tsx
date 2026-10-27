"use client";

import { useEffect, useState } from "react";
import Card from "./components/Card";

export default function Home() {
  const [count, setCount] = useState(0);
  const [countOver20, setCounterOver20] = useState(false);

  useEffect(() => {
    setCounterOver20(count > 20);
  }, [count]);

  return (
    <div className="bg-blue-500 text-white">
      <p className={"text-[32px]"}>Brojac: {count}</p>
      <button className={"bg-amber-400 text-black"} onClick={() => setCount(prev => prev + 1)}>
        Povecaj brojac
      </button>
      {countOver20 &&
        <p className={"text-[32px]"}>Brojac je presao 20!</p>
      }
      <div className="bg-blue-500 text-white">
        <Card color="bg-green-500" title="Zelena" />
        <Card color="bg-purple-500" title="Ljubicasta" />
      </div>
    </div>
  );
}
