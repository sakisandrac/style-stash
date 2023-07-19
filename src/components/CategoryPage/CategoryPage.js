import { useParams, Link, useLocation} from "react-router-dom";
import PieceLink from "../PieceLink/PieceLink";
import FormPiece from '../FormPiece/FormPiece'
import './CategoryPage.css';
import { getClosetData } from '../../apiCalls';
import { useEffect, useState } from 'react';

const CategoryPage = ({closeMenu, cart, checkCartForItem, addToCart, removeFromCart}) => {
  const location = useLocation()
  
  const [allPieces, setAllPieces] = useState(null);
  const [loading, setLoading] = useState(true);

  const category = useParams().category
 
    useEffect(() => {
      const apiCall = async () => {
        setLoading(true)
        try {
          let data = await getClosetData(category)
          setAllPieces(data.filteredPieces)
          setLoading(false)
        } catch (error) {
          //should we move error up to app so that we can pass the same error state every where? or make it its own component?
        }
      }
      apiCall();
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
      <h1 className='page-title' >{category.toUpperCase()}</h1>
      <section className='piece-container'>
        {allPieces ? pieceEls : loading ? <p>Loading...</p> : <p>No items in the {category} category yet! Add to your collection to get started!</p>}
      </section>
    </section>
  )
}

export default CategoryPage