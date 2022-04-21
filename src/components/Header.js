import PropTypes from 'prop-types';
import Button from './Button'

const Header = ({title}) => {

    const onClick = () => {
        console.log('click');
    }


    return(
       <header className='header'>
           <h1>{title}</h1>
           <Button color = 'green' text = 'Add' onClick = {onClick}/>
       </header>
    )
}

//setting of props in react
Header.defaultProps = {
    title: 'Task Tracker',
}
//CSS IN JS
// const headerStyle = {
//     color: 'red',
//     backgroundColor: 'blue'
// }

//setting of props
Header.propTypes = {
    title: PropTypes.string.isRequired, 
}
export default Header