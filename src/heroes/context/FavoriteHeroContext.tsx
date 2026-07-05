import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroContext {
    //State
    favorites: Hero[];
    favoriteCount: number;

    //Methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;
}

// const HeroSchema = z.object({
//     id: z.string(),
//     name: z.string(),
//     slug: z.string(),
//     alias: z.string(),
//     powers: z.array(z.string()),
//     description: z.string(),
//     strength: z.number(),
//     intelligence: z.number(),
//     speed: z.number(),
//     durability: z.number(),
//     team: z.string(),
//     image: z.string(),
//     firstAppearance: z.string(),
//     status: z.string(),
//     category: z.string(),
//     universe: z.string(),
// });

// eslint-disable-next-line react-refresh/only-export-components
export const FavoriteHeroContext = createContext({} as FavoriteHeroContext);

const getFavoritesFromLocalStorage = (): Hero[] => {
    const localStorageState = localStorage.getItem('favorites');
    return localStorageState ? JSON.parse(localStorageState) as Hero[] : [];

    // if(!localStorageState) return [];

    // const result = z.array(HeroSchema).safeParse(JSON.parse(localStorageState));

    // if (!result.success) {
    //     console.log('Invalid facorites data', result.error);

    //     try {
    //         return JSON.parse(localStorageState)
    //     } catch (error) {
    //         return [];
    //     }
    // }

    // return result.data;
}

export const FavoriteHeroProvider = ({children}: PropsWithChildren) => {
    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage());

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id);

        if(heroExist){
            setFavorites(favorites.filter(h => h.id !== hero.id));
            return;
        }

        setFavorites([...favorites, hero]);
    }

    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    return (
        <FavoriteHeroContext
            value={{
                // State
                favorites: favorites,
                favoriteCount: favorites.length,

                // Methods
                isFavorite: (hero: Hero) => favorites.some(h => h.id === hero.id),
                toggleFavorite: toggleFavorite,
            }}
        >   
            {children}
        </FavoriteHeroContext>
    )
}