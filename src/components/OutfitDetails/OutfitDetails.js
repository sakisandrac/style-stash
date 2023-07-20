import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getOutfitPieces } from '../../apiCalls';
import './OutfitDetails.css'

const OutfitDetails = ({ user, setAppError, appError }) => {
  const outfitID = useParams().id;
  const [pieces, setPieces] = useState(null);

  useEffect(() => {
    const apiCall = async (userID, outfitID) => {
      try {
        const data = await getOutfitPieces(userID, outfitID)
        console.log(data.outfitPieces)
        setPieces(data.outfitPieces)
      } catch (error) {
        setAppError(error)
      }
    }
    if (user) {
      apiCall(user.userID, outfitID)
    }
  },[])

  const pieceEls = (pieces) => {
    return pieces?.map(piece => <img className='piece-image' alt='piece of clothing' src={piece.image}/>)
  }

  return (
    <>
    {appError && <ErrorMessage appError={appError}/>}
    {user ? 
      <div className='outfit-details-container'>
        <h1 className='page-title page-title-short'>My Outfit</h1>
        <div className='pieces-container'>
          <button className='cart-button'>Edit Outfit</button>
          <div className='cart-pieces'>
            {pieceEls(pieces)}
          </div>
        </div>
      </div>
    : <p>Please login to continue</p>}
    </>
  )
}

export default OutfitDetails