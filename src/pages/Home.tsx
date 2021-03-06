import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    setTasks(oldState => [...oldState, {id: new Date().getTime(), title: newTaskTitle, done: false}])
  }

  function handleToggleTaskDone(id: number) {
    setTasks(oldState => oldState.map(item => item.id === id ? {id: item.id, title: item.title, done: !item.done} : item))
  }

  function handleRemoveTask(id: number) {
    setTasks(oldState => oldState.filter(item => item.id !== id))
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