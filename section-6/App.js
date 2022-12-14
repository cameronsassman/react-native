import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import CategoriesScreen from './screens/CategoriesScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailScreen from './screens/MealDetailScreen';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import FavoritesScreen from './screens/FavoriteScreen';
// import FavouritesContextProvider from './store/context/favourites-contex';
import { store } from './store/redux/store';
import { Provider } from 'react-redux';

const Stack = createNativeStackNavigator()
const Drawer = createDrawerNavigator()

function DrawerNavigator() {
  return (
    <Drawer.Navigator 
    screenOptions={{
      headerStyle: { backgroundColor: '#351401' },
      headerTintColor: 'white',
      sceneContainerStyle: { backgroundColor: '#3f2f25'},
      drawerContentStyle: { backgroundColor: '#351401'},
      drawerInactiveTintColor: 'white',
      drawerActiveTintColor: '#351401',
      drawerActiveBackgroundColor: '#e4baa1'
    }}>
      <Drawer.Screen 
        name='Categories' 
        component={CategoriesScreen} 
        options={{
          title: 'All Categories',
          drawerIcon: ({ color, size }) => (
            <Ionicons name='list' color={color} size={size} />
          )
        }}
      />
      <Drawer.Screen 
        name='Favorites' 
        component={FavoritesScreen}
        options={{
          title: 'Favourites' 
        }} 
      />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      {/* <FavouritesContextProvider> */}
      <Provider store={store}>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{
              headerStyle: { backgroundColor: '#351401' },
              headerTintColor: 'white',
              contentStyle: { backgroundColor: '#3f2f25'}
            }}>
              <Stack.Screen 
                name="Drawer" 
                component={DrawerNavigator} 
                options={{
                  title: 'All Categories',
                }}
              />
              <Stack.Screen 
                name="MealsOverview" 
                component={MealsOverviewScreen}
              />
              <Stack.Screen name='MealDetail' component={MealDetailScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </Provider>
      {/* </FavouritesContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {}, 
});
