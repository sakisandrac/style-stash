import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './Closet.css';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import './Closet.css';
import plusIcon from '../../images/add.png'

const Closet = ({closeMenu, user}) => {
  return (
    <>
    {user ?
    <section className='closet-page'>
      <div className='icon-container'>
        <Link to='/itemform'><img alt='add to closet icon' src={plusIcon} /></Link>
      </div>
      <h1 className='page-title' >My Closet</h1>
      <CategoryContainer closeMenu={closeMenu} parentRoute={'closet' }/>
    </section>
    : <p className="login-prompt">Please Login to Continue</p>
    } 
    </>
  )
}

export default Closet