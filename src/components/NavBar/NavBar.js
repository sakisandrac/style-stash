import './NavBar.css'
import menu from '../../images/menu.png'

const NavBar = ({openMenu}) => {
  return (
    <nav>
      <button onClick={() => openMenu('open')} className='menu-btn'><img src={menu} alt='menu button' /></button>
      <h1 className="logo-heading">Style Stash</h1>
    </nav>
  )
}

export default NavBar