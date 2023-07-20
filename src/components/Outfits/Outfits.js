import { useEffect, useState } from 'react';
import add from '../../images/add.png';
import { Link } from 'react-router-dom';
import { getOutfitData, getOutfitPieces } from '../../apiCalls';
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import './Outfits.css'

const Outfits = ({setAppError, closeMenu, user, appError}) => {

  const [outfits, setOutfits] = useState();

  useEffect(() => {
    const apiCall = async (userID) => {
      try {
        const data = await getOutfitData(userID)
        console.log('outfit', data.allData)
        setOutfits(data.allData)
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCall(user.userID)
      }
  },[])

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
          <div>
            <Link key={outfit.outfit.id} to={`/outfitdetails/${outfit.outfit.id}`}>
            <div className='outfit-img-container'>
              {/* {outfit.outfitPieces.map(piece) => {

              }} */}
              <div className='outfit-grid'>img1</div>
              <div className='outfit-grid'>img2</div>
              <div className='outfit-grid'>img3</div>
              <div className='outfit-grid'>img4</div>
              <div className="overlay"></div>
              <div className='view-outfit-btn'>View my outfit</div>
            </div>
          </Link>
          </div>
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