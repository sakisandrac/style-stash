import '../Closet/Closet.css'
import './OutfitForm.css'
import {v4 as uuid} from 'uuid'
import ChooseCategory from '../ChooseCategory/ChooseCategory'
import hanger from '../../images/hanger.png'
import back from '../../images/arrow.png'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CategoryPage from '../CategoryPage/CategoryPage'
import Cart from '../Cart/Cart'
import { postData } from '../../apiCalls'

const OutfitForm = ({closeMenu, appError, setAppError, user}) => {
  const location = useLocation();
  const categoryInUrl = useParams().category;
  const [cart, setCart] = useState([]);
  const [addSuccess, setAddSuccess] = useState(false);
  const [outfitReady, setOutfitReady] = useState(false);
  const [notes, setNotes] = useState('');
  const [outfit, setOutfit] = useState('');
  const [fullOutfitImage, setFullOutfitImage] = useState('');

  const postNewOutfit = () => {
    postData(`outfits/${user.userID}`, outfit).then(newOutfit => {
      let pieceIDs = cart.map(piece => piece.id);
      pieceIDs.forEach(id => {
        postData(`outfit-to-pieces/${user.userID}`, { outfitID: newOutfit.newData.id, pieceID: id })
        .catch(err => {
          setAppError(err)
        })
      })
      clearOutfitSetup();
      setAddSuccess(true);
    })
    .catch(err => {
      setAppError(err)
    })
  }

  const clearOutfitSetup = () => {
    setCart([]);
    setNotes('');
    setOutfit('');
    setFullOutfitImage('');
    setOutfitReady(false);
  }

  useEffect(() => {
    if(outfitReady) {
      setOutfit({id: `OUT-${uuid()}`, fullOutfitImage, notes})
    }
  }, [outfitReady])

  useEffect(() => {
    if (outfit) {
      postNewOutfit();
    }
  }, [outfit])

  const updateNotes = newNotes => {
    setNotes(newNotes);
  }

  const updateOutfitImg = (e) => setFullOutfitImage(URL.createObjectURL(e.target.files[0]));

  const checkCartForItem = (id) => cart.find(item => item.id === id) ? true : false

  const addToCart = (piece) => {
    setCart(prevCart => [...prevCart, piece]);
  }

  const removeFromCart = (piece) => {
    setCart(prevCart => prevCart.filter(item => item.id !== piece.id));
  }

  const MainContent = () => {
    if(location.pathname.includes('cart')) {
      return (
        <Cart 
          cart={cart} 
          removeFromCart={removeFromCart} 
          fullOutfitImage={fullOutfitImage} 
          updateOutfitImg={updateOutfitImg}
          notes={notes}
          appError={appError}
          updateNotes={updateNotes} 
          setOutfitReady={setOutfitReady}
          addSuccess={addSuccess}
          setAddSuccess={setAddSuccess}
        />
      )
    } else if(categoryInUrl) {
      return (
        <CategoryPage 
          cart={cart} 
          checkCartForItem={checkCartForItem} 
          addToCart={addToCart} 
          removeFromCart={removeFromCart}
          setAppError={setAppError}
          user={user}
        />     
      )
    } else {
      return <ChooseCategory parentRoute='outfitform' closeMenu={closeMenu}/>
    }
  }

  return (
    <section className={location.pathname.includes('cart') ? 'cart-page' :'closet-page'}>
      <section className='top-form-links'>
        {!location.pathname.includes('cart') && categoryInUrl && <Link to='/outfitform'><img src={back} alt='back button'/></Link>}
        <section className="outfit-cart-link-container">
          <Link className='outfit-cart-link' to='/outfitform/cart'><img src={hanger}/></Link>
          <div className='cart-count-container'><p className="cart-count">{cart.length}</p></div>
        </section>
      </section>
      <MainContent />
    </section>
  )
}

export default OutfitForm