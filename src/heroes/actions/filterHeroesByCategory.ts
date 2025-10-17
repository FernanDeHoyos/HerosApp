import type { Hero } from "../types/Get-hero.response"; 

export type Categoria = "all" | "heroes" | "villains" | "favorites";

export const filterHeroesByCategory = (heroes: Hero[], categoria: Categoria): Hero[] => {
  switch (categoria) {
    case "heroes":
      return heroes.filter(h => h.biography.alignment?.toLowerCase() === "good");
    case "villains":
      return heroes.filter(h => h.biography.alignment?.toLowerCase() === "bad");
    case "all":
    default:
      return heroes;
  }
};
