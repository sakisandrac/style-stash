import './NavBar.css'
import menu from '../../images/menu.png';
import userIcon from './user.png'
import { Link } from 'react-router-dom';

const NavBar = ({ openMenu, user, setUser }) => {

const handleClick = () => {
  if(user) {
    setUser(null)
  }
}

  return (
    <nav>
      <button onClick={() => openMenu('open')} className='menu-btn'><img src={menu} alt='menu button' /></button>
      <Link to='/' className="logo-heading"><h1 className="logo-heading">Style Stash</h1></Link>
      <Link to={!user ? '/login' : '/'}><div onClick={handleClick} className='login-container'>
        <img className='user-icon 'src={userIcon} alt='user-icon'/>
        {user ? <p className='login-text'>Log Out</p>: <p className='login-text'>Please Log In</p>}
      </div>
      </Link>
    </nav>
  )
}

export default NavBar