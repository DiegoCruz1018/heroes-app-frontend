import { CustomJumbotron } from "@/components/custom/CustomJumbotron";
import { HeroStats } from "@/heroes/components/HeroStats";
import { SearchControls } from "./ui/SearchControls";
import { CustomBreadcrumbs } from "@/components/custom/CustomBreadcrumbs";
import { HeroGrid } from "@/heroes/components/HeroGrid";
import { useQuery } from "@tanstack/react-query";
import { searchHeroesAction } from "@/heroes/actions/search-heros.action";
import { useSearchParams } from "react-router";

const SearchPage = () => {
    const [ searchParams ] = useSearchParams();

    const name = searchParams.get('name') ?? undefined;
    const strength = searchParams.get('strength') ?? undefined;

    // TODO: useQuery
    const { data: heroesResponse = [] } = useQuery({
        queryKey: ['search', { name, strength }],
        queryFn: () => searchHeroesAction({ name, strength }),
        staleTime: 1000 * 60 * 5, // 5 minutos
    });

    return (
        <>
            {/* Header */}
            <CustomJumbotron 
                title="Búsqueda de SuperHéroes" 
                description="Descubre, explora y administra super héroes y villanos"
            />

            <CustomBreadcrumbs currentPage="Buscador de héroes" 
                // breadcrumbs={
                //     [
                //         {label: 'Home', to: '/'},
                //         {label: 'Home2', to: '/'},
                //         {label: 'Home3', to: '/'},
                //     ]
                // }
            />

            {/* Stats Dashboard */}
            <HeroStats />

            {/* Filter and searcg */}
            <SearchControls />

            {/* Show Heroes */}
            <HeroGrid heroes={heroesResponse} />
        </>
    )
}

export default SearchPage;