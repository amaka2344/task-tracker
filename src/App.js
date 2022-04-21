//use state inside a function we use hook (USESTATE) 
import { useState } from "react"
import Header from './components/Header'
import Tasks from './components/Tasks';


function App() {
  const [tasks, setTasks] = useState(
    [
    {
        id: 1,
        text: 'Doctors Appointment',
        day: 'Feb 5th at 2:30pm',
        remainder: true,
    },
    {
        id: 2,
        text: 'Meeting at school',
        day: 'Feb 6th at 1:30pm',
        remainder: true,
    },
    {
        id: 3,
        text: 'Food Shopping',
        day: 'Feb 8th at 2:30pm',
        remainder: false,
    },
    ]
    )

  return (
    <div className="container">
      <Header />
      <Tasks task = {tasks}/>
    </div>
  );
}

export default App;