import { useEffect, useState } from 'react';
import add from '../../images/add.png';
import { Link } from 'react-router-dom';
import { getOutfitData } from '../../apiCalls';
import './Outfits.css'

const Outfits = ({setAppError, closeMenu, user}) => {

  const [outfits, setOutfits] = useState();

  useEffect(() => {
    const apiCall = async (userID) => {
      try {
        const data = await getOutfitData(userID)
        console.log('outfit', data.outfitData)
        setOutfits(data.outfitData)
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCall(user.userID)
      }
  },[])


    const userOutfitImages = outfits?.map(outfit => {
      if(outfit.fullOutfitImage) {
        return (
          <Link to={`/outfitdetails/${outfit.id}`}>
            <div className='outfit-img-container' key={outfit.id}> 
              <img className='full-outfit-img' src={outfit.fullOutfitImage} alt={`image of outfit ${outfit.id}`}/>
              <div className="overlay"></div>
              <div className='view-outfit-btn'>View my outfit</div>
            </div>
          </Link>
        )
      } else {
        //invoke another function to get pieces
      }
    })


  return (
    <>
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