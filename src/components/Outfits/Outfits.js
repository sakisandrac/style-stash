import { useEffect, useState } from 'react';
import add from '../../images/add.png';
import { Link } from 'react-router-dom';
import { getData } from '../../apiCalls';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import './Outfits.css'

const Outfits = ({setAppError, closeMenu, user, appError}) => {

  const [outfits, setOutfits] = useState();

  useEffect(() => {
    const apiCall = async (type, userID) => {
      try {
        const data = await getData(type, userID)
        setOutfits(data.allData)
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCall('outfits', user.userID)
      }
  },[])

  const outfitPieceImgs = (outfit) => {
    const allImages = outfit.outfitPieces.map(piece => {
      return <img key={piece.id} className='piece-img' src={piece.image} />
    })
    return allImages.slice(0, 4)
  }

    const userOutfitImages = outfits?.map(outfit => {
      if(outfit.outfit.fullOutfitImage) {
        return (
          <Link key={outfit.outfit.id} to={`/outfitdetails/${outfit.outfit.id}`}>
            <div className='outfit-img-container' > 
              <img className='full-outfit-img' src={outfit.outfit.fullOutfitImage} alt={`image of outfit ${outfit.id}`}/>
              <div className="overlay"></div>
              <div className='view-outfit-btn'>View my outfit</div>
            </div>
          </Link>
        )
      } else {
        return (
            <Link key={outfit.outfit.id} to={`/outfitdetails/${outfit.outfit.id}`}>
            <div className='outfit-img-container'>
              {outfitPieceImgs(outfit)}
              <div className="overlay"></div>
              <div className='view-outfit-btn'>View my outfit</div>
            </div>
          </Link>
        )
      }
    })


  return (
    <>
    {appError && <ErrorMessage appError={appError}/>}
    {user ?
      <div className='my-outfits-container'>
        <Link to='/outfitform' className='menu-btn add-btn' onClick={() => closeMenu('close')}><img src={add} alt='close button' /></Link>
        <h1 className='my-outfits-header'>My Outfits</h1>
        <div className='outfits-container'>
          {userOutfitImages}
        </div>
      </div>
      : <p>Please Login to Continue</p>}
    </>
  )
}

export default Outfits