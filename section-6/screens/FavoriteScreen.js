import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux';
// import { useContext } from "react";

// import { FavouritesContext } from "../store/context/favourites-contex";
import MealList from '../components/MealList/MealList'
import { MEALS } from "../data/dummy_data";

function FavoritesScreen() {
    // const favouriteMealCtx = useContext(FavouritesContext)
    const favouriteMealIds = useSelector(state => state.favouriteMeals.ids)

    const favouriteMeals =MEALS.filter(meal => favouriteMealIds.includes(meal.id))

    if (favouriteMeals.length === 0) {
        return (
            <View style={styles.rootContainer}>
                <Text style={styles.text}>
                    You have no favourite meals yet.
                </Text>
            </View>
        )
    }

    return (
        <MealList items={favouriteMeals} />
    )
}

export default FavoritesScreen

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    } 
});