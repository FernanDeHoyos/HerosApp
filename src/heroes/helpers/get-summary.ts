import type { Hero } from "../types/Get-hero.response";
import type { summary } from "../types/get-summary.response"

interface Powerstats {
  intelligence: number;
  strength: number;
  speed: number;
  durability: number;
  power: number;
  combat: number;
}

export const getSummary = (heroes: Hero[]): summary => {
  
  const comparar = (a:Hero, b:Hero) => {
  const keys: (keyof Powerstats)[] = [
    'intelligence',
    'strength',
    'speed',
    'durability',
    'power',
    'combat'
  ];
  
  for (const key of keys) {
    const valA = a.powerstats[key] ?? 0;
    const valB = b.powerstats[key] ?? 0;
    if (valA > valB) return a;
    if (valB > valA) return b;
  }
  return a; // si son idénticos, devuelve el primero
};

const masFuerteEInteligente = heroes.reduce((max, hero) => comparar(max, hero));

console.log(masFuerteEInteligente);


  return {
    total: heroes.length,
    heroes: heroes.filter(hero => hero.biography.alignment == 'good').length,
    villains: heroes.filter(hero => hero.biography.alignment == 'bad').length,
    byGender: {
      male: 0,
      female: 0,
      other: 0,
    },
    stats: {
      avgPower: 0,
      maxStrength: Math.max(),
      maxIntelligence: masFuerteEInteligente,
    },
    
  };
};

