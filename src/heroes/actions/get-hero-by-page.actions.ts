import { heroApi } from "../api/hero.api"
import type { Hero } from "../types/Get-hero.response";

export const getHeroesByIdsAction = async (
  page: number,
  limit: number = 9,
  category: String = 'all'
): Promise<{ heroes: Hero[]; totalPages: number }> => {
  try {
    if (isNaN(page)) page = 1;
    if (isNaN(limit)) limit = 9;

    const { data } = await heroApi.get<Hero[]>("all.json");

    // Filtrar antes de paginar
    const filteredData = data.filter(hero => {
      if (category === 'all') return true;
      if (category === 'heroes') return hero.biography.alignment === 'good';
      if (category === 'villains') return hero.biography.alignment === 'bad';
      return true;
    });

    const totalPages = Math.ceil(filteredData.length / limit);
    const start = (page - 1) * limit;
    const end = page * limit;

    return {
      heroes: filteredData.slice(start, end),
      totalPages,
    };
  } catch (err) {
    return {
      heroes: [],
      totalPages: 0,
    };
  }
};
