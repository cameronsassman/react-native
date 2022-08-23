import { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import GoalInput from './components/GoalInput';
import GoalItem from './components/GoalItem';

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [courseGoals, setCourseGoals] = useState([])

  function startAddGoalHandler() {
    setModalIsVisible(true)
  }

  function endAddGoalHandler() {
    setModalIsVisible(false)
  }

  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentcourseGoals) => [...currentcourseGoals, {text: enteredGoalText, id: Math.random().toString()}])
    endAddGoalHandler()
  }

  function deleteGoalHandler(id) {
    setCourseGoals(currentcourseGoals => {
      return currentcourseGoals.filter((goal) => goal.id !== id)
    })
  }

  return (
    <>
      <StatusBar style='light' />
      <View style={styles.appContainer}>
        <Button 
          title='Add New Goal' 
          color='#5e0acc' 
          onPress={startAddGoalHandler}
        />
        <GoalInput 
            visible={modalIsVisible} 
            onAddGoal={addGoalHandler}
            onCancel={endAddGoalHandler} 
          />
        <View style={styles.goalContainer}>
          <FlatList data={courseGoals} renderItem={(itemData) => {
            return (
              <GoalItem 
                text={itemData.item.text} 
                onDeleteItem={deleteGoalHandler}
                id={itemData.item.id}
              />
            )
          }}
          keyExtractor={(item, index) => {
            return item.id
          }} 
          alwaysBounceHorizontal={false} />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalContainer: {
    flex: 5
  }
});
