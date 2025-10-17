import { useQuery } from "@tanstack/react-query"
import { getHeroesByIdsAction } from "../actions/get-hero-by-page.actions"

export const usePaginatedHero = (
  page: number,
  limit: number,
  category ='all'
) => {
  return useQuery({
    queryKey: ['heroes', { page, limit, category }],
    queryFn: () => getHeroesByIdsAction(page, limit, category),
    staleTime: 1000 * 60 * 5,
  })
}
