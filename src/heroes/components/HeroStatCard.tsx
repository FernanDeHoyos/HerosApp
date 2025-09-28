import  { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { PropsWithChildren } from "react"

interface Props extends PropsWithChildren {
    Title: String,
    Icon: React.ReactNode
}

const HeroStatCard = ({ Title, Icon, children }: Props) => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{Title}</CardTitle>
                {Icon}
            </CardHeader>
            <CardContent>
            {children}
            </CardContent>
        </Card>
    )
}

export default HeroStatCard
