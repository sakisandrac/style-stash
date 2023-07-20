import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getOutfitPieces } from '../../apiCalls';

const OutfitDetails = ({ user, setAppError, appError }) => {
  const outfitID = useParams().id;

  useEffect(() => {
    const apiCall = async (userID, outfitID) => {
      try {
        const data = await getOutfitPieces(userID, outfitID)
        console.log(data)
      } catch (error) {
        //handle errpr
      }
      
    }
    // apiCall(user.userID, outfitID)
  },[])

  return (
    <>
    {appError && <ErrorMessage appError={appError}/>}
    {user ? 
      <div>outfit details</div>
    : <p>Please login to continue</p>}
    </>
  )
}

export default OutfitDetails