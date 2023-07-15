import './NavBar.css'
import menu from '../../images/menu.png'

const NavBar = () => {
  return (
    <nav>
      <button className='menu-btn'><img src={menu} alt='menu button' /></button>
      <h1 className="logo-heading">Style Stash</h1>
    </nav>
  )
}

export default NavBar