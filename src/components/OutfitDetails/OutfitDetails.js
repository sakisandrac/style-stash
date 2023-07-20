import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ErrorMessage from "../ErrorMessage/ErrorMessage";

const OutfitDetails = ({ user, setAppError, appError }) => {
  const outfitID = useParams().id;

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