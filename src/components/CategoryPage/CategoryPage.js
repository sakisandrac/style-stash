import { useParams, Link } from "react-router-dom";
import placeholder from '../../images/placeholder.png';
import './CategoryPage.css';
import { getClosetData } from '../../apiCalls';
import { useEffect, useState } from 'react';

const CategoryPage = ({closeMenu}) => {
  
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

  const pieceEls = allPieces?.map(piece => 
  <Link to={`/closet/${category}/${piece.id}`} className='piece-link closet-link' key={piece.id} id={piece.id} onClick={() => closeMenu('close')} >
    <img src={piece.image} />
  </Link>)
  
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