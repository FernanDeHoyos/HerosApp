import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"

export const HeroApp = () => {
  return (
   <>
   <RouterProvider router={appRouter}/>
   </>
  )
}

