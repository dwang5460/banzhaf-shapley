"use client"

import Game from "@/components/game";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Home() {
  const [n, setN] = useState(1)

  return (
    <div className="flex flex-col gap-6 p-6 items-start">
      <p className="text-2xl">Shapley & Banzhaf Calculator</p>
      <div className="flex gap-2">
        <Button onClick={() => setN(n + 1)}>Add Game</Button>
        {n > 1 && <Button variant="destructive" onClick={() => setN(n - 1)}>Delete Game</Button>}
      </div>
      {[...Array(n)].map((_, index) => (
        <Game key={index} />
      ))}
    </div>
  )
}
