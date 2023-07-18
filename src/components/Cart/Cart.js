import './Cart.css'
import { Link } from "react-router-dom"
import { useState } from 'react'
import remove from '../../images/close.png'

const Cart = ({cart, removeFromCart, fullOutfitImage, updateOutfitImg, setOutfitReady}) => {
  const [error, setError] = useState('');
  const pieceEls = cart.map(piece => {
    return (
      <div style={{width: '90%', display: "flex", }}key={piece.id}>
        <img style={{width: '80%'}} src={piece.image} alt='item in cart'/>
        <button onClick={() => removeFromCart(piece)}><img src={remove}/></button>
      </div>
    )
})

  const completeLook = () => {
    if(!cart.length) {
      setError('Add at least one clothing item to create an outfit!')
    } else {
      console.log('inside complete look')
      setOutfitReady(true)
    }
  }
  return (
    <section className='cart-page'>
      <div style={{display: "flex"}}>
        <Link className='cart-button' to='/outfitform'>Continue Adding Pieces</Link>
        <label htmlFor='outfitImgUpload' className='cart-button'>{fullOutfitImage ? 'Change' : 'Add'} Full Outfit Image
          <input id='outfitImgUpload' className='file-upload-default' type="file" onChange={updateOutfitImg} />
        </label>
      </div>
      <img style={{width: "150px"}} className='file-image' src={fullOutfitImage} />
      <section className="cart-pieces">
        {cart.length ? pieceEls : <p className='empty-cart-text'>No clothing items added yet! Add some pieces to create an outfit!</p>}
      </section>
      <button className='cart-button' onClick={completeLook}>Complete The Look</button>
      {error && <p>{error}</p>}
    </section>
  )
}

export default Cart