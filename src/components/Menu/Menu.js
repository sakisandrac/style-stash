import { Link, useLocation } from "react-router-dom"
import './Menu.css'
import close from '../../images/close.png'

const Menu = ({closeMenu}) => {
  const currentLocation = useLocation().pathname
  const allLocations = [{path: '/', name: 'Home'}, {path: '/closet', name: 'My Closet'}, {path: '/outfits', name: 'My Outfits'}]
  const links = allLocations
    .filter(location => location.path !== currentLocation)
    .map(location => <Link className='menu-btn link' key={location.path} to={location.path} onClick={() => closeMenu('close')}>{location.name}</Link> )

  return (
    <aside className='menu'> 
    <button className='menu-btn close-menu' onClick={() => closeMenu('close')}><img src={close} alt='close button' /></button>
      {links}
    </aside>
  )
}

export default Menu