import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useParams, Link, useLocation} from "react-router-dom";
import PieceLink from "../PieceLink/PieceLink";
import FormPiece from '../FormPiece/FormPiece'
import './CategoryPage.css';
import { getClosetData } from '../../apiCalls';
import { useEffect, useState } from 'react';
import back from '../../images/arrow.png'

const CategoryPage = ({  user, appError, setAppError, closeMenu, cart, checkCartForItem, addToCart, removeFromCart}) => {
  const location = useLocation()
  
  const [allPieces, setAllPieces] = useState(null);
  const [loading, setLoading] = useState(true);

  const category = useParams().category
  const userID = user?.userID

  useEffect(() => {
    setAppError(null)
  }, [])
 
    useEffect(() => {
      console.log('id', userID)
      const apiCall = async () => {
        setLoading(true)
        try {
          let data = await getClosetData(category, userID)
          setAllPieces(data.filteredPieces)
          setLoading(false)
        } catch (error) {
          setAppError(error)
        }
      }
      if(user) {
        apiCall();
      }
  }, [])

  const pieceEls = allPieces?.map(piece => {
    if (location.pathname.includes('closet')) {
      return <PieceLink key={piece.id} category={category} piece={piece} closeMenu={closeMenu}/>
    } else {
      const itemInCart = checkCartForItem(piece.id)
      return <FormPiece key={piece.id} piece={piece} itemInCart={itemInCart} addToCart={addToCart} removeFromCart={removeFromCart}/>
    }
  })
  
  return (
    <section className='category-page'>
      {appError && <ErrorMessage appError={appError}/>}
      {location.pathname.includes('closet') && <div className='back-to-closet'><Link to='/closet'><img src={back} alt='back button'/></Link></div>}
      <h1 className='page-title' >{category.toUpperCase()}</h1>
      <section className='piece-container'>
        {allPieces ? pieceEls : user ? loading ? <p>Loading...</p> : <p>No items in the {category} category yet! Add to your collection to get started!</p> : <p>Please login to continue</p>}
      </section>
    </section>
  )
}

export default CategoryPage
