import { useParams, Link, useLocation} from "react-router-dom";
import PieceLink from "../PieceLink/PieceLink";
import FormPiece from '../FormPiece/FormPiece'
import './CategoryPage.css';
import { getClosetData } from '../../apiCalls';
import { useEffect, useState } from 'react';

const CategoryPage = ({closeMenu, checkCartForItem, addToCart, removeFromCart}) => {
  const location = useLocation()
  
  const [allPieces, setAllPieces] = useState(null);
  const category = useParams().category
 
    useEffect(() => {
      const apiCall = async () => {
        try {
          let data = await getClosetData(category)
          setAllPieces(data.filteredPieces)
          return data
        } catch (error) {
          //should we move error up to app so that we can pass the same error state every where? or make it its own component?
        }
      }
      apiCall();
  }, [])

  useEffect(() => {
    console.log('data', allPieces)
  }, [allPieces])

  const pieceEls = allPieces?.map(piece => {
    if (location.pathname.includes('closet')) {
      return <PieceLink key={piece.id} category={category} piece={piece} closeMenu={closeMenu}/>
    } else {
      const itemInCart = checkCartForItem(piece.id)
      const updatedPiece = {...piece, inCart: itemInCart}
      return <FormPiece key={piece.id} piece={updatedPiece} addToCart={addToCart} removeFromCart={removeFromCart}/>
    }
  })
  
  return (
    <section className='category-page'>
      <h1 className='page-title' >{category.toUpperCase()}</h1>
      <section className='piece-container'>
        {allPieces ? pieceEls : <p>No items in the {category} category yet! Add to your collection to get started!</p>}
      </section>
    </section>
  )
}

export default CategoryPage