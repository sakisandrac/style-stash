import '../Closet/Closet.css'
import './OutfitForm.css'
import {v4 as uuid} from 'uuid'
import CategoryContainer from "../CategoryContainer/CategoryContainer"
import hanger from '../../images/hanger.png'
import back from '../../images/arrow.png'
import { Link, useLocation, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CategoryPage from '../CategoryPage/CategoryPage'
import Cart from '../Cart/Cart'
import { postOutfit, postPieceToOutfit } from '../../apiCalls'

const OutfitForm = ({closeMenu}) => {
  const location = useLocation()
  const categoryInUrl = useParams().category
  const [cart, setCart] = useState([])
  const [outfitReady, setOutfitReady] = useState(false)
  const [notes, setNotes] = useState('')
  const [outfit, setOutfit] = useState('')
  const [fullOutfitImage, setFullOutfitImage] = useState('')

  useEffect(() => {
    if(outfitReady) {
      console.log('in use effect for outfit ready')
      setOutfit({id: `OUT-${uuid()}`, fullOutfitImage, notes})
    }
  }, [outfitReady])

  useEffect(() => {
    const apiCall = async () => {
      try {
        let newOutfit = await postOutfit(outfit)
        let pieceIDs = cart.map(piece => piece.id)
        pieceIDs.forEach(id => {
          postPieceToOutfit({outfitID: newOutfit.newData.id, pieceID: id})
        })
      } catch (error) {
        console.log(error)
      }
    }

    if(outfit) {
      apiCall()
    }
  }, [outfit])
  const updateOutfitImg = (e) => setFullOutfitImage(URL.createObjectURL(e.target.files[0]))

  const checkCartForItem = (id) => cart.find(item => item.id === id) ? true : false

  const addToCart = (piece) => {
    setCart(prevCart => [...prevCart, piece])
  }

  const removeFromCart = (piece) => {
    setCart(prevCart => prevCart.filter(item => item.id !== piece.id))
  }

  const ChooseCategory = () => {
    return (
      <>
        <h2 style={{textAlign: "center", fontWeight: "lighter"}}>Choose a category to add an item</h2>
        <CategoryContainer closeMenu={closeMenu} parentRoute={'outfitform'}/>
      </>
    )
  }

  const MainContent = () => {
    if(location.pathname.includes('cart')) {
      return <Cart cart={cart} removeFromCart={removeFromCart} fullOutfitImage={fullOutfitImage} updateOutfitImg={updateOutfitImg} setOutfitReady={setOutfitReady}/>
    } else if(categoryInUrl) {
      return <CategoryPage cart={cart} checkCartForItem={checkCartForItem} addToCart={addToCart} removeFromCart={removeFromCart}/>     
    } else {
      return <ChooseCategory />
    }
  }


  return (
    <section className={location.pathname.includes('cart') ? 'cart-page' :'closet-page'}>
      <section className="top-form-links">
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