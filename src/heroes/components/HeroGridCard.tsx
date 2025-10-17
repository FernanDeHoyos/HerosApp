import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Zap, Brain, Shield } from "lucide-react"
import type { Hero } from "../types/Get-hero.response"
import { useNavigate } from "react-router"

interface Props {
  hero: Hero
  onClick?: () => void;
}

export const HeroGridCard = ({ hero }: Props) => {
const navigate = useNavigate();
  const isHero = hero.biography.alignment === "good";
  const topStats = [
    { name: "Power", value: hero.powerstats.power, icon: Zap },
    { name: "Durability", value: hero.powerstats.durability, icon: Shield },
    { name: "Intelligence", value: hero.powerstats.intelligence, icon: Brain },
  ].sort((a, b) => b.value - a.value).slice(0, 3);

  return (
      <Card
      className="group relative overflow-hidden cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)] bg-card border-border"
      onClick={() => navigate(`/hero/${hero.id}`)}
    >
      {/* Image Container */}
      <div className="relative h-100 overflow-hidden">
        <img
          src={hero.images.md}
          alt={hero.name}
          className="object-cover transition-all duration-500 group-hover:scale-110 absolute top-[-30px] w-full h-[450px] "
        />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-60"
          style={{
            background: isHero 
              ? 'linear-gradient(180deg, transparent 0%, hsl(220 20% 14%) 100%)'
              : 'linear-gradient(180deg, transparent 0%, hsl(0 84% 10%) 100%)'
          }}
        />
        
        {/* Alignment Badge */}
        <div className="absolute top-4 right-4">
          <Badge 
            className={`font-bold uppercase tracking-wider ${
              isHero 
                ? 'bg-[hsl(217_91%_60%)] hover:bg-[hsl(217_91%_70%)] text-primary-foreground shadow-[0_0_15px_hsl(217_91%_60%/0.5)]' 
                : 'bg-[hsl(0_84%_60%)] hover:bg-[hsl(0_84%_70%)] text-primary-foreground shadow-[0_0_15px_hsl(0_84%_60%/0.5)]'
            }`}
          >
            {isHero ? "Hero" : "Villain"}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Name and Publisher */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-primary transition-colors">
            {hero.name}
          </h3>
          <p className="text-sm text-muted-foreground">
            {hero.biography.publisher}
          </p>
        </div>

        {/* Top Stats */}
        <div className="grid grid-cols-3 gap-3">
          {topStats.map((stat) => (
            <div
              key={stat.name}
              className="flex flex-col items-center p-3 rounded-lg bg-secondary/50 border border-border transition-colors group-hover:bg-secondary"
            >
              <stat.icon className={`w-5 h-5 mb-2 ${isHero ? 'text-blue-400' : 'text-red-400'}`}  />
              <div className="text-xs text-muted-foreground mb-1">{stat.name}</div>
              <div className="text-lg font-bold text-foreground">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Full Name */}
        {hero.biography.fullName && hero.biography.fullName !== hero.name && (
          <p className="text-sm text-muted-foreground italic">
            {hero.biography.fullName}
          </p>
        )}
      </div>

      {/* Hover Effect Border */}
      <div 
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none"
        style={{
          background: isHero
            ? 'linear-gradient(135deg, hsl(217 91% 60% / 0.1), hsl(262 83% 58% / 0.1))'
            : 'linear-gradient(135deg, hsl(0 84% 60% / 0.1), hsl(25 95% 53% / 0.1))',
             boxShadow: isHero
      ? "0 0 30px hsl(217 91% 60% / 0.6)" // azul para héroes
      : "0 0 30px hsl(0 84% 60% / 0.6)"  // rojo para villano
        }}
      />
    </Card>
  )
}

