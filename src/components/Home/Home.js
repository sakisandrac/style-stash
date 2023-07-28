import './Home.css';
import logo from '../../images/homepage.png';
import { useEffect, useState } from 'react';
import { getData } from '../../apiCalls';
import { Link } from 'react-router-dom';

const Home = ({user, setAppError}) => {

  const [featuredImage, setFeaturedImage] = useState({})
  const [featuredItems, setFeaturedItems] = useState([])

  const getRandIndex = (num) => {
    return Math.floor(Math.random() * num)
  }

  useEffect(() => {
    const apiCall = async (type, userID) => {
      try {
        const data = await getData(type, userID)
        const outfit = data.allData[getRandIndex(data.allData.length)].outfit
        if (outfit.fullOutfitImage) {
          console.log('outgit', outfit.fullOutfitImage)
          setFeaturedImage(data.allData[getRandIndex(data.allData.length)].outfit)
        } else {
          apiCall()
        }
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCall('outfits', user.userID)
      }
  },[])

  useEffect(() => {
    const apiCallItem = async (type, userID) => {
      try {
        setFeaturedItems([])
        const data = await getData(type, userID)
        const items = [data.pieces[getRandIndex(data.pieces.length)], data.pieces[getRandIndex(data.pieces.length)], data.pieces[getRandIndex(data.pieces.length)], data.pieces[getRandIndex(data.pieces.length)]]
        if (items.length > 4) {
          items.splice(0, 1)
        }
        setFeaturedItems(items)
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCallItem('closet', user.userID)
      }
  },[])

  const featuredPieces = () => {
    return featuredItems.map(item => <img key={item.id} className={`featured-piece piece-${featuredItems.indexOf(item)}`} src={item.image}/>
  )}

  return (
    <div className='homepage-container'>
      <main className='homepage'> 
        {/* <img className='home-logo' src={logo} /> */}
        {user?
          <div className='featured-container'>
            <div className='featured-left'>
              <div className='featured-img-container'>
                <img className='featured-img' src={featuredImage.fullOutfitImage} />
                <Link className='view-outfit-link' to={`/outfitdetails/${featuredImage.id}`}><div className='view-outfit-btn-home'>View my outfit</div></Link>
                <p className='featured-img-text'>Today's Featured Outfit ♡</p>
              </div>
            </div>
            <div className='featured-right'>
              <div className='featured-pieces-container'>
                {featuredPieces()}
                <p className='featured-img-text'>Re-discover These Pieces ♡</p>
              </div>
            </div>
          </div>
        : <p>Please Login to Style Stash!</p>}
      </main>
    </div>
  )
}

export default Home