import { MinusCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type VoterProps = {
  id: number
  onChange: (id:number, weight: number) => void,
  onDelete: (id:number) => void,
}

export default function Voter({id, onChange, onDelete}: VoterProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="w-auto">Voter #{id + 1}</span>
      <Input className="w-12" onChange={(e) => {onChange(id, parseInt(e.target.value))}} />
      { id > 0 &&
        <Button variant="ghost" size="icon" className="hover:bg-red-100" onClick={() => onDelete(id)}>
          <MinusCircle className="text-red-500" />
        </Button>
      }
    </div>
  )
}
