import add from '../../images/add.png'
import remove from '../../images/remove.png'

const FormPiece = ({piece, addToCart, removeFromCart}) => {
  console.log('piece in cart', piece.inCart)
  return (
  <div className='choose-piece'>
    <button onClick={piece.inCart ? () => removeFromCart(piece.id) : () => addToCart(piece.id)}><img src={piece.inCart ? remove : add}/></button>
    <img src={piece.image} />
  </div>
  )
}

export default FormPiece