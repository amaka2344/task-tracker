//use state inside a function we use hook (USESTATE) 
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header'
import Footer from './components/Footer'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

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


  //to fetch a single task to toggle reminder in the server
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks ${id}`)
    const data = await res.json()
    return data
  }

  //fetch data
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
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
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

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
        task.id === id ? {
          ...task, reminder:
            !data.reminder
        } : task
      )
    )

  }


  // adding of props and new compnents created
  return (
    <Router>
      <div className="container">

        <Header onAdd={() => setShowAddTask(!ShowAddTask)} showAdd={ShowAddTask} />

       
          <Route path='/' exact render={(props) => (
            <>
              {ShowAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />)
                : ("No task to Show")}
            </>
          )}>
          </Route>
          <Route path='/About' components={About}></Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
