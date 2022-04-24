//use state inside a function we use hook (USESTATE) 
import { useState, useEffect } from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';

function App() {
const [ShowAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
     const getTasks = async () => {
        const tasksFromServer = await fetchTasks()
          setTasks(tasksFromServer)
        
     }
  getTasks()
  }, [])


  //fetch data
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
   return data
  }

    //to fetch a single task to toggle reminder in the server
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks ${id}`)
      const data = await res.json()
     return data
    }

  //add task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
  },
  body: JSON.stringify(task)
})

  const data = await res.json()
  setTasks([...tasks, data])
  }

  //delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) => task.id !== id))
  }

  //toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = {...taskToToggle, reminder: !taskToToggle.reminder} 

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(updTask)
    })

    const data = await res.json()

    setTasks(
      tasks.map((task) => 
      task.id === id ? { ...task, reminder:
      !data.reminder } : task
      ) 
    )
   
  }
 

  // adding of props and new compnents created
  return (
    <div className="container">
        
      <Header onAdd = {()=> setShowAddTask(!ShowAddTask)} showAdd = {ShowAddTask}/>
      {ShowAddTask && <AddTask onAdd = {addTask}/>}      
      {tasks.length > 0 ? (
      <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />) : ("No task to Show")}
    </div>
  );
}

export default App;
