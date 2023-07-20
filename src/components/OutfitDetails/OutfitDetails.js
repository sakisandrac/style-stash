import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getData } from '../../apiCalls';
import './OutfitDetails.css';
import backIcon from '../../images/arrow.png'

const OutfitDetails = ({ user, setAppError, appError }) => {
  const outfitID = useParams().id;
  const [pieces, setPieces] = useState(null);
  const [outfitData, setOutfitData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(outfitData?.notes);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiCall = async (type, userID, outfitID) => {
      setLoading(true)
      try {
        const data = await getData(type, userID, outfitID)
        console.log('data', data)
        setPieces(data.outfitPieces)
        setOutfitData(data.outfitData)
        setNotes(data.outfitData.notes)
        setLoading(false)
      } catch (error) {
        setAppError(error)
      }
    }
    if (user) {
      apiCall('outfits', user.userID, outfitID)
    }
  },[])

  const pieceEls = (pieces) => {
    return pieces?.map(piece => <img className='piece-image' key={piece.id} alt='piece of clothing' src={piece.image}/>)
  }
  
  const toggleEditing = () => {
    setIsEditing(prev => !prev)
  }

  const handleChange = (e) => {
    setNotes(e.target.value)
  }

  return (
    <>
    {appError && <ErrorMessage appError={appError}/>}
    {user ? 
      <div className='outfit-details-container'>
        <div className='back-icon-container'>
          <Link to='/outfits'><img alt='icon for back button'src={backIcon}/></Link>
        </div>
        <h1 className='page-title page-title-short'>My Outfit</h1>
        <div className='pieces-container'>
          <button className='cart-button' onClick={toggleEditing}>{`${isEditing? 'Save Edits' : 'Edit Outfit'}`}</button>
          <div className='cart-pieces'>
            {pieceEls(pieces)}
          </div>
          {isEditing ?
          <input type='textarea' className='outfit-notes' onChange={(e) => handleChange(e)} value={notes} placeholder={notes.length > 0? notes : 'Add notes here...'}/>
          : <div className='outfit-notes'>{loading? 'loading...' : notes.length > 0? notes : 'Add notes here...'}
          </div>}
        </div>
      </div>
    : <p>Please login to continue</p>}
    </>
  )
}

export default OutfitDetails