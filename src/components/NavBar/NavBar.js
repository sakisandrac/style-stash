import './NavBar.css'
import menu from '../../images/menu.png';
import userIcon from './user.png'
import { Link } from 'react-router-dom';

const NavBar = ({openMenu, user}) => {


  return (
    <nav>
      <button onClick={() => openMenu('open')} className='menu-btn'><img src={menu} alt='menu button' /></button>
      <h1 className="logo-heading">Style Stash</h1>
      <Link to={!user ? '/login' : '/'}><div className='login-container'>
        <img className='user-icon 'src={userIcon} alt='user-icon'/>
        {user ? <p className='login-text'>Welcome</p>: <p className='login-text'>Please Log In</p>}
      </div>
      </Link>
    </nav>
  )
}

export default NavBar