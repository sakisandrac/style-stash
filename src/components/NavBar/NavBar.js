import './NavBar.css';
import menu from '../../images/menu.png';
import userIcon from './user.png';
import { Link } from 'react-router-dom';

const NavBar = ({ openMenu, user, setUser }) => {
  const handleClick = () => {
    if (user) {
      setUser(null);
    }
  };

  return (
    <>
    <div className='construction-marquee'><marquee>This project is currently under construction- not all features may work yet!</marquee></div>
    <nav>
      <button onClick={() => openMenu('open')} className="menu-nav-btn">
        <img src={menu} alt="menu button" />
      </button>
      <Link to="/" className="logo-heading">Style Stash</Link>
      <Link to={!user ? '/login' : '/'}>
        <div onClick={handleClick} className="login-container">
          <img className="user-icon " src={userIcon} alt="user-icon" />
          {user ? (
            <p className="login-text">Log Out</p>
          ) : (
            <p className="login-text">Please Log In</p>
          )}
        </div>
      </Link>
    </nav>
    </>
  );
};

export default NavBar;
