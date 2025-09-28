import { ComposerJumbotron } from "@/components/composer/ComposerJumbotron"
import { HeroStats } from "@/heroes/components/HeroStats"
import Searchcontrol from "./ui/Searchcontrol"

export const SearchPage = () => {
  return (
    <div>
      <ComposerJumbotron 
        Title={"Search SuperHero"} 
        Description="Search you favorite superhero"
        />

      <HeroStats/>
      <Searchcontrol/>
    </div>
  )
}
