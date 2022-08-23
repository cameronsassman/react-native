import { createContext, useState } from "react";

export const FavouritesContext = createContext({
    id: [],
    addFaourite: (id) => {},
    removeFavourite: (id) => {}
})

function FavouritesContextProvider({children}) {
    const [favouriteMealIds, setFavouriteMealIds] = useState([])

    function addFaourite(id) {
        setFavouriteMealIds((currentFavIds) => [...currentFavIds, id])
    }

    function removeFavourite() {
        setFavouriteMealIds((currentFavIds) => 
            currentFavIds.filter((mealId) => mealId !== id)
        )
    }
    const value = {
        ids: favouriteMealIds,
        addFaourite: addFaourite,
        removeFavourite: removeFavourite
    }
    return (
        <FavouritesContext.Provider value={value}>{children}</FavouritesContext.Provider>
    )
}

export default FavouritesContextProvider