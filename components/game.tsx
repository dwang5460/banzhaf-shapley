"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Voter from "@/components/voter";
import { useRef, useState } from "react";
import { calcBanzhaf, calcShapley } from "./utils";
import { Separator } from "./ui/separator";

export default function Game() {
  const quota = useRef(0)

  const [voters, setVoters] = useState([
    {
      id: 0,
      weight: 0,
    },
  ])
  const [banzhaf, setBanzhaf] = useState<number[]>([])
  const [shapley, setShapley] = useState<number[]>([])

  const handleWeightChange = (id: number, weight: number) => {
    setVoters(prev => prev.map(voter => voter.id === id ? { ...voter, weight: weight } : voter))
  }

  const handleDelete = (id: number) => {
    setVoters(prev => prev.filter(voter => voter.id !== id))
  }

  return (
    <>
      <p className="font-semibold">Quota:</p>
      <Input className="w-12" onChange={(e) => quota.current = parseInt(e.target.value)} />
      <p className="font-semibold">Voter Weights:</p>
      <div className="flex gap-4">
        {voters.map((voter) => <Voter key={voter.id} id={voter.id} onChange={handleWeightChange} onDelete={handleDelete}/>)}
      </div>
      <Button variant="outline" onClick={() => {setVoters([...voters, {id: voters.at(-1)!.id+1, weight: 0}])}}>+ Add Voter</Button>
      <Button onClick={() => {
        setBanzhaf(calcBanzhaf(quota.current, voters.map(voter => voter.weight)))
        setShapley(calcShapley(quota.current, voters.map(voter => voter.weight)))
      }}>Calculate</Button>
      <p>Banzhaf: {banzhaf.map((value) => `${value} `)}</p>
      <p>Shapley: {shapley.map((value) => `${value} `)}</p>
      <Separator />
    </>
  )
}
