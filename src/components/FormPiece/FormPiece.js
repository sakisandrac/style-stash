import add from '../../images/add.png'
import remove from '../../images/remove.png'

const FormPiece = ({piece, itemInCart, addToCart, removeFromCart}) => {
  return (
  <div className='choose-piece'>
    <button onClick={itemInCart ? () => removeFromCart(piece) : () => addToCart(piece)}><img src={itemInCart ? remove : add}/></button>
    <img src={piece.image} />
  </div>
  )
}

export default FormPiece