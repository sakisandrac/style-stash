import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import CategoryPage from '../CategoryPage/CategoryPage';
import { getData, patchData, postData, deleteData } from '../../apiCalls';
import './OutfitDetails.css';
import backIcon from '../../images/arrow.png';
import xIcon from '../../images/close.png';
import plus from '../../images/add.png'

const OutfitDetails = ({ user, setAppError, appError, closeMenu}) => {
  const outfitID = useParams().id;
  const [pieces, setPieces] = useState(null);
  const [outfitData, setOutfitData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(outfitData?.notes);
  const [loading, setLoading] = useState(true);
  const [newOutfitImage, setNewOutfitImage] = useState("");
  const [addSuccess, setAddSuccess] = useState(false);
  const [deletedPieces, setDeletedPieces] = useState([]);
  const [newPieces, setNewPieces] = useState([]);
  const location = useLocation()
  const categoryInUrl = useParams().category

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

  const removePiece = (currentPiece) => {
    const filteredPieces = pieces.filter(piece => piece.id !== currentPiece.id)
    setPieces(filteredPieces)
    setDeletedPieces(prev => [...prev, currentPiece.id])
  }

  const addPiece = (piece) => {
    setPieces(prev => [...prev, piece])
    setNewPieces(prev => [...prev, piece.id])
  }

  const checkForItem = (id) => pieces.find(item => item.id === id) ? true : false

  const pieceEls = (pieces) => {
    return pieces?.map(piece => {
      return (
      <div key={piece.id} className='piece-image-container'>
        <img className='piece-image' alt='piece of clothing' src={piece.image}/>
        {isEditing && <img alt='icon to remove item' src={xIcon} onClick={() => {removePiece(piece)}} />}
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
          fullOutfitImage: newOutfitImage ? newOutfitImage : outfitData.fullOutfitImage,  
        })

        deletedPieces.forEach(id => {
          deleteData('outfit-to-pieces', `${user.userID}`, { outfitID: outfitData.id, pieceID: id })
        })
        
        newPieces.forEach(id => {
          postData(`outfit-to-pieces/${user.userID}`, {outfitID: outfitData.id, pieceID: id})
        })
      } catch (error) {
        setAppError(error)
      }
    }

    if (addSuccess) {
      apiCall()
    }
  }, [addSuccess])

  const OutfitLanding = () => {
    return (
      <div className='outfit-details-container'>
        <div className='back-icon-container'>
          <Link to='/outfits'><img alt='icon for back button'src={backIcon}/></Link>
          {isEditing && <Link to={`/outfitdetails/${outfitID}/add-piece`} ><img alt='icon for add item button' src={plus}/></Link>}
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
    )
  }
  const ChooseCategory = () => {
    return (
      <>
        <Link to={`/outfitdetails/${outfitID}`}><img src={backIcon} alt='back button'/></Link>
        <h2 style={{textAlign: "center", fontWeight: "lighter"}}>Choose a category to add an item</h2>
        <CategoryContainer closeMenu={closeMenu} parentRoute={`outfitdetails/${outfitID}/add-piece`}/>
      </>
    )
  }

  const MainContent = () =>{
    if(categoryInUrl) {
      return (
        <CategoryPage 
        removeFromCart={removePiece}
        addToCart={addPiece}
        checkCartForItem={checkForItem}
        outfitID={outfitID}
        setAppError={setAppError}
        user={user}
      /> 
      )
    } else if(location.pathname.includes('add-piece')) {
      return (
        <ChooseCategory />
      )
    } else {
      return <OutfitLanding />
    }
  }

  return (
    <>
    {appError && <ErrorMessage appError={appError}/>}
    {user ? <MainContent /> : <p>Please login to continue</p>}
    </>
  )
}

export default OutfitDetails