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

import { useMemo } from "react"
import { useSearchParams } from "react-router"
import { useHeroSummary } from "@/heroes/hooks/useHeroSummary"
import { usePaginatedHero } from "@/heroes/hooks/usePaginatedHero"


export const HomePage = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const isActive = searchParams.get('tab') ?? 'all'
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '9'
  const category = searchParams.get('category') ?? 'all'

  const selectActiveTab = useMemo(() => {
  const validTab = ["all", "favorites", "heroes", "villains"]
  return validTab.includes(isActive) ? isActive : 'all'
}, [isActive])

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)
  const { data: summaryData } = useHeroSummary()

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
                prev.set('category', 'all')
                prev.set('page', '1')
                return prev
              })}>All Characters {summaryData?.total}</TabsTrigger>

            <TabsTrigger
              value="favorites"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'favorites')
                prev.set('category', 'favorites')
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
                prev.set('category', 'heroes')
                prev.set('page', '1')
                return prev
              })}>
              Heroes {summaryData?.heroes}
            </TabsTrigger>

            <TabsTrigger value="villains"
              onClick={() => setSearchParams((prev) => {
                prev.set('tab', 'villains')
                prev.set('category', 'villains')
                prev.set('page', '1')
                return prev
              })}>
              Villains {summaryData?.villains}
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
            <HeroGrid heroes={heroes} />
          </TabsContent>
          <TabsContent value="villains">
            <h1>Todos los villanos</h1>
            {/* Character Grid */}
            <HeroGrid heroes={heroes} />
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