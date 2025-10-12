import { CustomMenu } from "@/components/custom/CustomMenu"
import { Outlet } from "react-router"

export const HeroesLayout = () => {
    return (
        <div className="min-h-screen min-h-screen bg-background border-b border-border">
            <div className="max-w-7xl mx-auto p-6">
                <CustomMenu/>
                <Outlet/>
            </div>
        </div>
    )
}

