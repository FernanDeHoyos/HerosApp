import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/Get-hero.response";

export const getHeroAction = async (id: String) => {
  try {
    const { data } = await heroApi.get<Hero>(`/id/${id}.json`);
    return {
      ...data
    }
  } catch (err) {
    console.error("Error in getHero:", err);
    return null;
  }
}