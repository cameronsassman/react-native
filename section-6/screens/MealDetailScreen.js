import { useLayoutEffect } from 'react'

import { View, Text, StyleSheet, ScrollView, Image } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import IconButton from '../components/IconButton'
import List from '../components/MealDetail/List'
import Subtitle from '../components/MealDetail/Subtitle'
import MealDetails from '../components/MealDetails'
import { addFaourite, removefavourite } from '../store/redux/favourites'
import { MEALS } from '../data/dummy_data'
// import { FavouritesContext } from '../store/context/favourites-contex'

function MealDetailScreen({ route, navigation }) {
    // const favouriteMealCtx = useContext(FavouritesContext)
    const favouriteMealIds = useSelector((state) => state.favouriteMeals.ids)
    const dispatch = useDispatch()

    const mealId =  route.params.mealId

    const selectMeal = MEALS.find((meal) =>meal.id === mealId)

    const mealsFavourite = favouriteMealIds.includes(mealId)

    function changeFavouriteStatusHandler() {
        if  (mealsFavourite) {
            // favouriteMealCtx.removeFavourite(mealId)
            dispatch(removefavourite({ id: mealId }))
        }
        else {
            // favouriteMealCtx.addFaourite(mealId)
            dispatch(addFaourite({ id: mealId }))
        }
    }

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => {
                return (
                    <IconButton 
                        icon={mealsFavourite ? 'star' : 'star-outline'} 
                        color="white" 
                        onPress={changeFavouriteStatusHandler} />
                )
            }
        })
    }, [navigation, changeFavouriteStatusHandler])

    return (
        <ScrollView style={styles.rootContainer}>
            <Image source={{ uri: selectMeal.imageUrl }} style={styles.image} />
            <Text style={styles.title} >{selectMeal.title}</Text>
            <MealDetails 
                duration={selectMeal.duration} 
                complexity={selectMeal.complexity} 
                affordability={selectMeal.affordability} 
                textStyle={styles.detailText}
            />
            <View style={styles.listOuterContainer}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={selectMeal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={selectMeal.steps} />
                </View>
            </View>
        </ScrollView>
    )
}

export default MealDetailScreen

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32
    },
    image: {
        width: '100%',
        height: 350 
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 24,
        margin: 8,
        color: 'white'
    },
    detailText: {
        color: 'white'
    },
    listContainer: {
        width: '80%'
    },
    listOuterContainer: {
        alignItems: 'center'
    },
})