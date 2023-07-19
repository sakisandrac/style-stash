import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './Closet.css';
import CategoryContainer from '../CategoryContainer/CategoryContainer'
import './Closet.css'

const Closet = ({closeMenu, user}) => {
  return (
    <>
    {user ?
    <section className='closet-page'>
      <h1 className='page-title' >My Closet</h1>
      <CategoryContainer closeMenu={closeMenu} parentRoute={'closet' }/>
    </section>
    : <p>Please Login to Continue</p>
    } 
    </>
  )
}

export default Closet