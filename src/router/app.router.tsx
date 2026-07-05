import { AdminPage } from "@/admin/pages/AdminPage";
import { HeroesLayout } from "@/heroes/layouts/HeroesLayout";
import HeroPage from "@/heroes/pages/hero/HeroPage";
import { HomePage } from "@/heroes/pages/home/HomePage";
import { lazy } from "react";
import { createHashRouter, Navigate, RouterProvider } from "react-router";

const SearchPage = lazy(() => import('@/heroes/pages/search/SearchPage'));
const AdminLayout = lazy(() => import('@/admin/layouts/AdminLayout'));
// const AdminPage = lazy(() => import('@/admin/pages/AdminPage'));

// export const appRouter = createBrowserRouter([
export const appRouter = createHashRouter([
    {
        path: '/',
        element: <HeroesLayout />,
        children: [
            {
                index: true,
                element: <HomePage />
            },
            {
                path: 'heros/:idSlug',
                element: <HeroPage />
            },
            {
                path: 'search',
                element: <SearchPage />
            },
            {
                path: '*',
                element: <Navigate to="/" />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <AdminPage />
            }
        ]
    }
]);

export const AppRouter = () => {
    return <RouterProvider router={appRouter} />
}