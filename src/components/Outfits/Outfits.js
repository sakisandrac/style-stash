import add from '../../images/add.png'
import { Link } from 'react-router-dom'

const Outfits = ({closeMenu, user}) => {

  return (
    <>
    {user ?
      <>
        <Link to='/outfitform' className='menu-btn add-btn' onClick={() => closeMenu('close')}><img src={add} alt='close button' /></Link>
        <p>Outfits will go here</p>
      </>
      : <p>Please Login to Continue</p>}
    </>
  )
}

export default Outfits