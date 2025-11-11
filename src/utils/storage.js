import { Storage } from '@capacitor/storage'

const TASKS_KEY = 'my_tasks'

export const getTasks = async () => {
  try {
    const { value } = await Storage.get({ key: TASKS_KEY })
    return value ? JSON.parse(value) : []
  } catch (error) {
    console.error('Error getting tasks:', error)
    return []
  }
}

export const saveTasks = async (tasks) => {
  try {
    await Storage.set({
      key: TASKS_KEY,
      value: JSON.stringify(tasks)
    })
  } catch (error) {
    console.error('Error saving tasks:', error)
  }
}

export const addTask = async (taskName) => {
  const tasks = await getTasks()
  const newTask = {
    id: Date.now().toString(),
    name: taskName,
    completed: false
  }
  tasks.push(newTask)
  await saveTasks(tasks)
  return newTask
}

export const toggleTask = async (taskId) => {
  const tasks = await getTasks()
  const updatedTasks = tasks.map(task =>
    task.id === taskId ? { ...task, completed: !task.completed } : task
  )
  await saveTasks(updatedTasks)
  return updatedTasks
}

export const deleteTask = async (taskId) => {
  const tasks = await getTasks()
  const updatedTasks = tasks.filter(task => task.id !== taskId)
  await saveTasks(updatedTasks)
  return updatedTasks
}

