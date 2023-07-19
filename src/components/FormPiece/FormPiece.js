import add from '../../images/add.png'
import remove from '../../images/remove.png'
import './FormPiece.css'

const FormPiece = ({piece, itemInCart, addToCart, removeFromCart}) => {
  return (
  <div className='choose-piece piece-link closet-link'>
    <button className='add-cart-btn' onClick={itemInCart ? () => removeFromCart(piece) : () => addToCart(piece)}><img src={itemInCart ? remove : add}/></button>
    <img src={piece.image} />
  </div>
  )
}

export default FormPiece