import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import { getData, patchData, deleteData } from '../../apiCalls';
import './OutfitDetails.css';
import backIcon from '../../images/arrow.png';
import xIcon from '../../images/close.png';

const OutfitDetails = ({ user, setAppError, appError }) => {
  const outfitID = useParams().id;
  const [pieces, setPieces] = useState(null);
  const [outfitData, setOutfitData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(outfitData?.notes);
  const [loading, setLoading] = useState(true);
  const [newOutfitImage, setNewOutfitImage] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);
  const [deletedPieces, setDeletedPieces] = useState([]);

  useEffect(() => {
    const apiCall = async (type, userID, outfitID) => {
      setLoading(true)
      try {
        const data = await getData(type, userID, outfitID)
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

  const removePiece = (e) => {
    const filteredPieces = pieces.filter(piece => piece.id !== e.target.id)
    setPieces(filteredPieces)
    setDeletedPieces(prev => [...prev, e.target.id])
  }

  const pieceEls = (pieces) => {
    return pieces?.map(piece => {
      return (
      <div key={piece.id} className='piece-image-container'>
        <img className='piece-image' alt='piece of clothing' src={piece.image}/>
        {isEditing && <img id={piece.id} alt='icon to remove item' src={xIcon} onClick={(e) => {removePiece(e)}} />}
      </div>
    )})
  }
  
  const toggleEditing = () => {
    setIsEditing(prev => !prev)
    setAddSuccess(false)

    if(isEditing) {
      setAddSuccess(true)
    }
  }

  const handleChange = (e) => {
    setNotes(e.target.value)
  }

  const changeOutfitImage = (e) => {
    setNewOutfitImage(URL.createObjectURL(e.target.files[0]));
  }

  useEffect(() => {
    const apiCall = async () => {
      try {
        let newOutfit = await patchData('outfit', `${user.userID}/${outfitData.id }`, {
          notes, 
          fullOutfitImage: newOutfitImage,  
        })

        deletedPieces.forEach(id => {
          deleteData('outfit-to-pieces', `${user.userID}`, { outfitID: outfitData.id, pieceID: id })
        })
      } catch (error) {
        setAppError(error)
      }
    }

    if (addSuccess) {
      apiCall()
    }
  }, [addSuccess])

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
          {isEditing &&
             <>
             <label htmlFor='fileUpload' className='upload-img-btn'>{`${outfitData.fullOutfitImage? 'Change': 'Upload'} Outfit Image`}
             <input id='fileUpload' className='file-upload-default' type="file" onChange={(e) => {changeOutfitImage(e)}}/>
           </label>
           <img className='file-image' src={newOutfitImage} />
           </>
          }
          <div className='cart-pieces'>
            {pieceEls(pieces)}
          </div>
          {isEditing ?
          <input type='textarea' className='outfit-notes' onChange={(e) => handleChange(e)} value={notes} placeholder={notes.length > 0? notes : 'Add notes here...'}/>
          : <div className='outfit-notes'>{loading? 'loading...' : notes.length > 0? notes : 'Add notes here...'}
          </div>}
          {addSuccess && <p>Outfit Edited!</p>}
        </div>
      </div>
    : <p>Please login to continue</p>}
    </>
  )
}

export default OutfitDetails