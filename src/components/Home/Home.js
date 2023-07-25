import './Home.css';
import logo from '../../images/homepage.png';
import { useEffect, useState } from 'react';
import { getData } from '../../apiCalls';

const Home = ({user, setAppError}) => {

  const [featuredImage, setFeaturedImage] = useState({})
  const getRandIndex = (num) => {
    return Math.floor(Math.random() * num)
  }

  useEffect(() => {
    const apiCall = async (type, userID) => {
      try {
        const data = await getData(type, userID)
        console.log(data.allData)
        setFeaturedImage(data.allData[getRandIndex(data.allData.length)].outfit.fullOutfitImage)
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCall('outfits', user.userID)
      }
  },[])

  return (
    <div className='homepage-container'>
      <main className='homepage'> 
        <img className='home-logo' src={logo} />
        {user?
        <div className='featured-img-container'>
          <img className='featured-img' src={featuredImage}/> 
          {/* <div className="overlay1"></div> */}
          <div className='view-outfit-btn'>View my outfit</div>
          {/* this doesn't link anywhere yet- will have to come back and add it! */}
          <p className='featured-img-text'>♡ Today's Featured Outfit ♡</p>
        </div> 
        : <p>Please Login to Style Stash!</p>}
      </main>
    </div>
  )
}

export default Home