import { useQuery } from "@tanstack/react-query"
import { getHeroAction } from "../actions/getHero.actions"

export const useGetHeroById = (id: String) => {
 return useQuery({
    queryKey: ["getHero", {id}],
    queryFn: () => getHeroAction(id),
    staleTime: 1000 * 60 * 10
  })
}
