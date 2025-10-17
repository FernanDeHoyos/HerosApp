import { HomePage } from "@/heroes/pages/home/HomePage";
import { HeroPage } from "@/heroes/pages/hero/HeroPage";
import { SearchPage } from "@/heroes/pages/search/SearchPage";
import { createBrowserRouter } from "react-router";
import { HeroesLayout } from "@/heroes/layout/HeroesLayout";
import { AdminLayout } from "@/admin/Layout/AdminLayout";
import { AdminPage } from "@/admin/pages/AdminPage";

export const appRouter = createBrowserRouter([
    {
        path: "/",
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: "hero/:id",
                element: <HeroPage />
            },
            {
                path: "search",
                element: <SearchPage />
            }
        ],

    },
    {
        path: "/admin",
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    }

])