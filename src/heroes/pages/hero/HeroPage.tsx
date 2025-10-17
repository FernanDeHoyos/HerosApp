import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useGetHeroById } from "@/heroes/hooks/useGetHeroById"
import { Shield, Zap, Brain, Gauge, Users, Star, Award } from "lucide-react"
import { useParams } from "react-router"

export const HeroPage = () => {
  const { id = '' } = useParams()
  const { data } = useGetHeroById(id)

  if (!data) return <h3 className="text-center py-10 text-muted-foreground">Cargando...</h3>

  const superheroData = data.powerstats
  const totalPower =
    superheroData.strength + superheroData.intelligence + superheroData.speed + superheroData.durability
  const averagePower = Math.round((totalPower / 4) * 10)

  const getCategoryColor = (category: string) => {
    switch (category.toLowerCase()) {
      case "héroe":
        return "bg-[hsl(var(--hero))] text-white"
      case "villano":
        return "bg-[hsl(var(--villain))] text-white"
      case "antihéroe":
        return "bg-[hsl(var(--accent))] text-white"
      default:
        return "bg-[hsl(var(--muted))] text-[hsl(var(--muted-foreground))]"
    }
  }

  return (
    <div className="min-h-screen bg-[hsl(var(--background))] text-[hsl(var(--foreground))] transition-colors duration-500">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-[hsl(var(--hero))] via-[hsl(var(--accent))] to-[hsl(var(--hero-glow))] text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Imagen */}
            <div className="relative">
              <img
                src={data.images.md || "/placeholder.svg"}
                alt={data.name}
                width={200}
                height={200}
                className="rounded-full border-4 border-white/30 shadow-[var(--shadow-glow)]"
              />
              <div className="absolute -top-2 -right-2 bg-yellow-400 text-black rounded-full p-2">
                <Star className="w-6 h-6" />
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                <Badge className={`${getCategoryColor(data.biography.alignment)}`}>
                  {data.biography.alignment}
                </Badge>
                <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                  {data.biography.publisher}
                </Badge>
              </div>

              <h1 className="text-4xl md:text-6xl font-bold mb-2 drop-shadow-lg">{data.name}</h1>
              <p className="text-lg text-[hsl(var(--muted-foreground))] mb-2">{data.biography.fullName}</p>
              <p className="text-sm text-[hsl(var(--muted-foreground))]">{data.biography.alterEgos}</p>
            </div>

            {/* Nivel de poder */}
            <div className="text-center">
              <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm border border-white/20">
                <div className="text-3xl font-bold text-yellow-400">{averagePower}%</div>
                <div className="text-sm text-[hsl(var(--muted-foreground))]">Nivel de Poder</div>
                <div className="flex justify-center mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(averagePower / 20)
                        ? "text-yellow-400 fill-current"
                        : "text-gray-500"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENIDO PRINCIPAL */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <Tabs defaultValue="stats" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8 bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
            <TabsTrigger value="stats" className="flex items-center gap-2 text-[hsl(var(--foreground))]">
              <Gauge className="w-4 h-4" /> Estadísticas
            </TabsTrigger>
            <TabsTrigger value="powers" className="flex items-center gap-2">
              <Zap className="w-4 h-4" /> Poderes
            </TabsTrigger>
            <TabsTrigger value="team" className="flex items-center gap-2">
              <Users className="w-4 h-4" /> Equipo
            </TabsTrigger>
            <TabsTrigger value="info" className="flex items-center gap-2">
              <Award className="w-4 h-4" /> Información
            </TabsTrigger>
          </TabsList>

          {/* TAB: Estadísticas */}
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Fuerza", value: superheroData.strength, color: "red" },
                { label: "Inteligencia", value: superheroData.intelligence, color: "purple" },
                { label: "Velocidad", value: superheroData.speed, color: "yellow" },
                { label: "Resistencia", value: superheroData.durability, color: "green" },
              ].map((stat, i) => (
                <Card key={i} className="bg-[hsl(var(--card))] text-center shadow-[var(--shadow-card)] border border-[hsl(var(--border))]">
                  <CardContent className="pt-6">
                    <div className="flex justify-center mb-4">
                      <div className={`p-3 rounded-full bg-${stat.color}-500/20`}>
                        <Zap className={`w-8 h-8 text-${stat.color}-400`} />
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{stat.label}</h3>
                    <div className={`text-3xl font-bold text-${stat.color}-400 mb-2`}>
                      {stat.value}
                    </div>
                    <Progress value={stat.value * 10} className="h-2" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* TAB: Poderes */}
          <TabsContent value="powers">
            <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-6 h-6 text-[hsl(var(--hero))]" />
                  Superpoderes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(data.powerstats).map(([key, value], index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg border border-[hsl(var(--border))] bg-[hsl(var(--card))]"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-[hsl(var(--hero))] p-2 rounded-full">
                          <Zap className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-medium capitalize">
                          {key}: {value}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Equipo */}
          <TabsContent value="team">
            <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-[hsl(var(--foreground))]">
                  <Users className="w-6 h-6 text-[hsl(var(--accent))]" />
                  Afiliación de Equipo
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center py-8">
                <div className="bg-[hsl(var(--muted))] p-6 rounded-full w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                  <Users className="w-12 h-12 text-[hsl(var(--accent))]" />
                </div>
                <h3 className="text-2xl font-bold mb-2">{data.connections.groupAffiliation}</h3>
                <p className="text-[hsl(var(--muted-foreground))]">Miembro activo del equipo de superhéroes más poderoso</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: Información */}
          <TabsContent value="info">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                <CardHeader>
                  <CardTitle>Detalles Personales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[hsl(var(--foreground))]">
                  <div className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))]">
                    <span className="text-[hsl(var(--muted-foreground))]">Nombre Real:</span>
                    <span className="font-semibold">{data.biography.fullName}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))]">
                    <span className="text-[hsl(var(--muted-foreground))]">Alias:</span>
                    <span className="font-semibold">{data.name}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-[hsl(var(--muted-foreground))]">Categoría:</span>
                    <Badge className={`${getCategoryColor(data.biography.alignment)}`}>
                      {data.biography.alignment}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                <CardHeader>
                  <CardTitle>Información del Universo</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-[hsl(var(--foreground))]">
                  <div className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))]">
                    <span className="text-[hsl(var(--muted-foreground))]">Universo:</span>
                    <span className="font-semibold">{data.biography.publisher}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-[hsl(var(--border))]">
                    <span className="text-[hsl(var(--muted-foreground))]">Primera Aparición:</span>
                    <span className="font-semibold">{data.biography.firstAppearance}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
