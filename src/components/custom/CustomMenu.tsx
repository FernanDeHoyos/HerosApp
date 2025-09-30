import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"

import { Link, useLocation } from "react-router"

export const CustomMenu = () => {

    const {pathname} = useLocation();

    const isActive = (path: String) => {
        return pathname === path;
    }

  return (
    <NavigationMenu>
  <NavigationMenuList>
    <NavigationMenuItem>
      <NavigationMenuLink asChild className={cn(isActive('/') && "bg-slate-200 rounded-nd", "p-2")}>
        <Link to="/">Inicio</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

    <NavigationMenuItem>
      <NavigationMenuLink asChild className={cn(isActive('/search') && "bg-slate-200 rounded-nd", "p-2")}>
        <Link to="/search">Buscar personaje</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>

  </NavigationMenuList>
</NavigationMenu>
  )
}

