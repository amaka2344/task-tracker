

//creating list in react by using map() array method
const Tasks = ({tasks}) => {

 


  return (
    <>
      {tasks.map((tasks) => 
      (<h3 key={tasks.id}>{tasks.text}</h3>))
      }
    </>
  )
}

export default Tasks
