import Task from './Task'

//creating list in react by using map() array method
const Tasks = ({tasks, onDelete}) => {
  return (
    <>
      {tasks.map((task) => (
      <Task key={task.id} task = {task} onDelete={onDelete}/>
      ))}
    </>
  )
}

export default Tasks
