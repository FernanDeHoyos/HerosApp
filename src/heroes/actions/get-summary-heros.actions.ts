import { heroApi } from "../api/hero.api";
import { getSummary } from "../helpers/get-summary";
import type { Hero } from "../types/Get-hero.response";
import type { summary } from "../types/get-summary.response";

export const getSummaryAction = async (): Promise<summary | null> => {
  try {
    const { data } = await heroApi.get<Hero[]>("all.json");
    return getSummary(data);
  } catch (err) {
    console.error("Error in getSummaryAction:", err);
    return null;
  }
}
