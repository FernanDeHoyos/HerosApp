import { useEffect } from "react"
import type { Hero, HeroesApiResponse } from "../types/Get-hero.response"
import { HeroGridCard } from "./HeroGridCard"

interface Props {
  heroes: Hero[]
}
export const HeroGrid = ({heroes}: Props) => {

  return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
        {
          heroes.map(hero => (
            <HeroGridCard
              key={hero.id}
              heroe={hero}
            />
          ))
        }
         
        </div>
  )
}

