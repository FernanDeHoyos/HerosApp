import { Badge } from "@/components/ui/badge"
import { Users, Heart, Zap, Trophy } from "lucide-react"
import HeroStatCard from "./HeroStatCard"
import { useHeroSummary } from "../hooks/useHeroSummary"

export const HeroStats = () => {

    const { data: summaryData } = useHeroSummary()

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">

            <HeroStatCard
                Title='Total Characters'
                Icon={<Users className="h-4 w-4 text-muted-foreground" />}
                >

                    <div className="text-2xl font-bold">{summaryData?.total}</div>
                    <div className="flex gap-1 mt-2">
                        <Badge variant="secondary" className="text-xs">
                            {summaryData?.heroes} heroes
                        </Badge>
                        <Badge variant="destructive" className="text-xs">
                            {summaryData?.villains} villanos
                        </Badge>
                    </div>
            </HeroStatCard>

            <HeroStatCard
                Title='Favorites'
                Icon={<Heart className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-2xl font-bold text-red-600">3</div>
                    <p className="text-xs text-muted-foreground">18.8% of total</p>
            </HeroStatCard>


            <HeroStatCard
                Title='Smartest'
                Icon={<Trophy className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-lg font-bold">{summaryData?.stats.maxIntelligence.name}</div>
                    <p className="text-xs text-muted-foreground">Intelligence: {summaryData?.stats.maxIntelligence.powerstats.intelligence}/100</p>
            </HeroStatCard>

            <HeroStatCard
                Title='Strongest'
                Icon={<Zap className="h-4 w-4 text-muted-foreground" />}
                >
                    <div className="text-lg font-bold">{summaryData?.stats.maxIntelligence.name}</div>
                    <p className="text-xs text-muted-foreground">Strength: {summaryData?.stats.maxIntelligence.powerstats.strength}/100</p>
            </HeroStatCard>

        
        </div>
    )
}

