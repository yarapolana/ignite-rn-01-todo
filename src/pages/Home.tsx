import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (tasks.find(task => task.title === newTaskTitle) !== undefined) {
      Alert.alert('Item already exists', 'You already added this item')
      return
    }

    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, newTask])
  }

  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(item => item.id === id ? {id: item.id, title: item.title, done: !item.done} : item))
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Confirm remove',
      'Are you sure you want to remove this item',
      [
        { 
          text: 'Confirm',
          onPress: () => setTasks(oldState => oldState.filter(item => item.id !== id)),
          style: 'default'},
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})