import { RouterProvider } from "react-router"
import { appRouter } from "./router/app.router"
import {QueryClient, QueryClientProvider} from "@tanstack/react-query"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './index.css'
//creamos el cliente para tanstack
const queryClient = new QueryClient()

export const HeroApp = () => {
  return (
   <QueryClientProvider client={queryClient}>
   <RouterProvider router={appRouter}/>
   <ReactQueryDevtools initialIsOpen={false} />
   </QueryClientProvider>
  )
}

