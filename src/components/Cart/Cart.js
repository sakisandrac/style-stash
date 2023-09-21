import './Cart.css';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import remove from '../../images/close.png';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

const Cart = ({appError, cart, removeFromCart, fullOutfitImage, updateOutfitImg, notes, updateNotes, setOutfitReady, addSuccess, setAddSuccess}) => {
  const [error, setError] = useState('');
  const [outfitNotes, setOutfitNotes] = useState(notes);

  const handleChange = (setup, args) => {
    if(setup) {
      setup(args);
    };
    setAddSuccess(false);
  };

  const completeLook = () => {
    if(!cart.length) {
      setError('Add at least one clothing item to create an outfit!');
    } else {
      setOutfitReady(true);
      updateNotes(outfitNotes);
    };
  };

  const pieceEls = cart.map(piece => {
    return (
      <div className='piece-in-cart' key={piece.id}>
        <img src={piece.image} alt='item in cart'/>
        <button className='remove-cart-button' onClick={() => removeFromCart(piece)}><img src={remove}/></button>
      </div>
    );
});

  return (
    <section className='cart-page'>
      <div style={{display: "flex"}}>
        <Link className='cart-button' to='/outfitform' onClick={() => handleChange(updateNotes, outfitNotes)}>{cart.length ? 'Continue' : 'Start'} Adding Pieces</Link>
      </div>
      <div className='img-upload-container'>
        <label htmlFor='outfitImgUpload' className='cart-button'>{fullOutfitImage ? 'Change' : 'Add'} Full Outfit Image
          <input id='outfitImgUpload' name='fileUpload' className='file-upload-default' type="file" onChange={(e) => handleChange(updateOutfitImg, e)} />
        </label>
        <p>OR</p>
        <input className='url-input' type='text' name='url' onChange={(e) => handleChange(updateOutfitImg, e)} placeholder='Add full outfit image URL'></input>
      </div>
      {fullOutfitImage && <img style={{width: "150px"}} className='file-image' src={fullOutfitImage} />}
      <section className="cart-pieces">
        {cart.length ? pieceEls : <p className='empty-cart-text'>No clothing items added yet! Add some pieces to create an outfit!</p>}
      </section>
      <input className='outfit-notes' type='textarea' placeholder="Add notes for this outfit..." value={outfitNotes} onChange={(e) => setOutfitNotes(e.target.value)}/>
      <button className='cart-button' onClick={completeLook}>Complete The Look</button>
      {addSuccess && !appError && !outfitNotes && <p>Outfit added successfully!</p>}
      {error && <p>{error}</p>}
      {appError && <ErrorMessage appError={appError} />}
    </section>
  )
}

export default Cart