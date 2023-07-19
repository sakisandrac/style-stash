import { useParams, Link } from "react-router-dom";
import './CategoryPage.css';
import { getClosetData } from '../../apiCalls';
import { useEffect, useState } from 'react';
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const CategoryPage = ({ user, closeMenu, appError, setAppError }) => {
  
  const [allPieces, setAllPieces] = useState(null);
  const category = useParams().category
  const userID = user.userID

  useEffect(() => {
    setAppError(null)
  }, [])
 
    useEffect(() => {
      console.log('id', userID)
      const apiCall = async () => {
        try {
          let data = await getClosetData(category, userID)
          setAllPieces(data.filteredPieces)
          return data
        } catch (error) {
          setAppError(error)
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
      {appError && <ErrorMessage appError={appError}/>}
      <h1 className='page-title' >{category.toUpperCase()}</h1>
      <section className='piece-container'>
        {allPieces ? pieceEls : <p>No items in the {category} category yet! Add to your collection to get started!</p>}
      </section>
    </section>
  )
}

export default CategoryPage