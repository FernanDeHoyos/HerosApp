import { heroApi } from "../api/hero.api"
import type { Hero, HeroesApiResponse } from "../types/Get-hero.response";


export const getHeroesByIdsAction = async ():Promise<Hero[]> => {
  try {
    const {data} = await heroApi.get<Hero[]>('all.json');
    console.log(data)
    return  data
  } catch (err) {
    console.error(err);
    return   [];
  }
};

