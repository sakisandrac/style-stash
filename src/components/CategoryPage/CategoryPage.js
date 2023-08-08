import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { useParams, Link, useLocation} from "react-router-dom";
import PieceLink from "../PieceLink/PieceLink";
import FormPiece from '../FormPiece/FormPiece'
import './CategoryPage.css';
import { getData } from '../../apiCalls';
import { useEffect, useState } from 'react';
import back from '../../images/arrow.png';

const CategoryPage = ({user, appError, setAppError, closeMenu, cart, checkCartForItem, addToCart, removeFromCart, outfitID}) => {
  const location = useLocation();
  
  const [allPieces, setAllPieces] = useState(null);
  const [loading, setLoading] = useState(true);

  const category = useParams().category;
  const userID = user?.userID;

  const getAllPieces = async () => {
    console.log('jere')
    setLoading(true);
    try {
      let data = await getData('closet', userID, category);
      setAllPieces(data.filteredPieces);
      setLoading(false);
    } catch (error) {
      setAppError(error);
    }
  }

  useEffect(() => {
    if (user) {
      getAllPieces();
    }
    return () => setAppError(null);
  }, []);

  const pieceEls = allPieces?.map(piece => {
    if (location.pathname.includes('closet')) {
      return <PieceLink key={piece.id} category={category} piece={piece} closeMenu={closeMenu}/>
    } else {
      const itemInCart = checkCartForItem(piece.id)
      return <FormPiece key={piece.id} piece={piece} itemInCart={itemInCart} addToCart={addToCart} removeFromCart={removeFromCart}/>
    };
  });
  
  const BackLink = () => {
    if(location.pathname.includes('closet') || location.pathname.includes('add-piece')) {
      return (
        <div className='back-to-closet'><Link to={ location.pathname.includes('closet') ? '/closet' : `/outfitdetails/${outfitID}/add-piece`}><img src={back} alt='back button'/></Link></div>
      )
    };
  };
  
  return (
    <section className='category-page'>
      {appError && <ErrorMessage appError={appError}/>}
      <BackLink />
      <h1 className='page-title' >{category.toUpperCase()}</h1>
      <section className='piece-container'>
        {allPieces ? pieceEls : user ? loading ? <p>Loading...</p> : <p>No items in the {category} category yet! Add to your collection to get started!</p> : <p>Please login to continue</p>}
      </section>
    </section>
  )
}

export default CategoryPage
