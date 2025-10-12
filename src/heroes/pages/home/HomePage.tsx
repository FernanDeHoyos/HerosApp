import {
  Filter,
  Heart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComposerJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadCrumb"
import { getHeroesByIdsAction } from "@/heroes/actions/get-hero-by-page.actions"
import { useQuery } from "@tanstack/react-query"
import { useMemo } from "react"
import { useSearchParams } from "react-router"


export const HomePage = () => {
  
  const [searchParams, setSearchParams] = useSearchParams()

  const isActive = searchParams.get('tab') ?? 'all'
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '9'
  
  const selectActiveTab = useMemo(() => {
    const validTab = ["all", "favorites", "heroes", "villains"] 
    return validTab.includes(isActive) ? isActive : 'all'
  },[isActive])

  const { data: heroesResponse } = useQuery({
    queryKey: ['heroes', {page, limit}], //key de la query
    queryFn: () => getHeroesByIdsAction(+page, +limit), //funcion a disparar cuando se ejecute la query 
    // !!importante si la funcion queryFn recibe algumentos, esos argumentos deben ir en queryKey
    staleTime: 1000 * 60 * 5 //tiempo en que la peticion http se va a cosiderar fresca (no se ejecutara de nuevo)
  })

  const heroes = heroesResponse?.heroes ?? [];
  const totalPages = heroesResponse?.totalPages ?? 0;


  // const [isActive, setIsActive] = useState<
  //   "all" |
  //   "favorites" |
  //   "heroes" |
  //   "villains"
  // >("all")

  return (
    <>
      <>
        {/* Header */}
        <ComposerJumbotron
          Title={"Superhero Database"}
          Description={"Explora y descubre superheroes y supervillanos"}
        />

        <CustomBreadcrumb
          currentPage={"Super heroes"}
          breadcrumb={[
            { label: "home1", to: "/" },
            { label: "home2", to: "/" },
            { label: "home3", to: "/" },
          ]}
        />


        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={selectActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger
              value="all"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'all')
                return prev
              })}>All Characters (16)</TabsTrigger>

            <TabsTrigger
              value="favorites"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites')
                return prev
              })}
              className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>

            <TabsTrigger
              value="heroes"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'heroes')
                return prev
              })}>
              Heroes (12)
            </TabsTrigger>

            <TabsTrigger value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains')
                return prev
              })}>
              Villains (2)
            </TabsTrigger>

          </TabsList>
          <TabsContent value="all">
            <h1>Todos los personajes</h1>
            {/* Character Grid */}
            <HeroGrid heroes={heroes} />
            {/* <HeroGrid /> */}
          </TabsContent>
          <TabsContent value="fovorites">
            <h1>Todos los personajes favoritos</h1>
            {/* Character Grid */}

          </TabsContent>
          <TabsContent value="heroes">
            <h1>Todos los heroes</h1>
            {/* Character Grid */}
            {/* <HeroGrid /> */}
          </TabsContent>
          <TabsContent value="villains">
            <h1>Todos los villanos</h1>
            {/* Character Grid */}
            {/* <HeroGrid /> */}
          </TabsContent>
        </Tabs>

        {/* Results info */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <p className="text-gray-600">Showing 6 of 16 characters</p>
            <Badge variant="secondary" className="flex items-center gap-1">
              <Filter className="h-3 w-3" />
              Filtered
            </Badge>
          </div>
        </div>



        {/* Pagination */}
        <CustomPagination totalPages={totalPages} />
      </>
    </>
  )
}