import { heroApi } from "../api/hero.api"
import { getSummary } from "../helpers/get-summary";
import type { Hero } from "../types/Get-hero.response";


export const getHeroesByIdsAction = async (
  page: number,
  limit: number = 9
): Promise<{ heroes: Hero[]; totalPages: number }> => {
  try {
    if (isNaN(page)) page = 1;
    if (isNaN(limit)) limit = 9;
    
    const { data } = await heroApi.get<Hero[]>("all.json");
    
    const totalPages = Math.ceil(data.length / limit);

    const start = (page - 1) * limit;
    const end = page * limit;

    return {
      heroes: data.slice(start, end),
      totalPages,
    };
  } catch (err) {
    return {
      heroes: [],
      totalPages: 0,
    };
  }
};



