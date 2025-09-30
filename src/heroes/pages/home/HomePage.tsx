import {
  Filter,
  Heart,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ComposerJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import { HeroGrid } from "@/heroes/components/HeroGrid"
import {CustomPagination} from "@/components/custom/CustomPagination"
import { CustomBreadcrumb } from "@/components/custom/CustomBreadCrumb"
import { getHeroesByIdsAction } from "@/heroes/actions/get-hero-by-page.actions"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"


export const HomePage = () => {

  const {data: heroesResponse} = useQuery({
    queryKey: ['heroes'], //key de la query
    queryFn: () => getHeroesByIdsAction(), //funcion a disparar cuando se ejecute la query
    staleTime: 1000 * 60 * 5 //tiempo en que la peticion http se va a cosiderar fresca (no se ejecutara de nuevo)
  })


  const [isActive, setIsActive] = useState<
    "all" |
    "favorites" |
    "heroes" |
    "villains"
  >("all")

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
        { label: "home1", to: "/"},
        { label: "home2", to: "/"},
        { label: "home3", to: "/"},
        ]}
         />


        {/* Stats Dashboard */}
        <HeroStats />

        {/* Tabs */}
        <Tabs value={isActive} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => setIsActive("all")}>All Characters (16)</TabsTrigger>
            <TabsTrigger value="favorites" onClick={() => setIsActive("favorites")} className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Favorites (3)
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => setIsActive("heroes")}>Heroes (12)</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => setIsActive("villains")}>Villains (2)</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <h1>Todos los personajes</h1>
            {/* Character Grid */}
            <HeroGrid heroes={heroesResponse ?? []  } />
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
        <CustomPagination totalPages={8} />
      </>
    </>
  )
}