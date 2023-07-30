import './Home.css';
import logo from '../../images/homepage.png';
import { useEffect, useState } from 'react';
import { getData } from '../../apiCalls';
import { Link } from 'react-router-dom';

const Home = ({menuOpen, user, setAppError}) => {

  const [featuredImage, setFeaturedImage] = useState({})
  const [featuredItems, setFeaturedItems] = useState([])
  const [featuredPieceClass, setFeaturedPieceClass] = useState('featured-piece')
  const randomPieces = []

  useEffect(() => {
    const updateCSS = () => {
      const classes = ['.featured-img-container', '.featured-img', '.featured-pieces-container']
      
      if(window.innerWidth > 1200 && window.innerWidth < 1650 && menuOpen) {
        classes.forEach(item => document.querySelector(item).classList.add('modal-open-featured'))
        setFeaturedPieceClass('modal-open-featured-piece')
      } else {
        classes.forEach(item => document.querySelector(item).classList.remove('modal-open-featured'))
        setFeaturedPieceClass('featured-piece')
      }

      if(window.innerWidth < 1000 && menuOpen) {
        document.querySelector('.featured-container').classList.add('column-flex')
      } else {
        document.querySelector('.featured-container').classList.remove('column-flex')
      }
    }
    window.addEventListener('resize', updateCSS)
    return () => window.removeEventListener('resize', updateCSS)
  })

  const getRandIndex = (num) => {
    return Math.floor(Math.random() * num)
  }

  const getAllRandomPieces = (pieces) => {
    const piecesToChooseFrom = pieces.filter(piece => {
      return randomPieces.some(item => item.id === piece.id) ? false : true
    })

    getRandomPiece(piecesToChooseFrom)
    if(randomPieces.length < 4) {
      getAllRandomPieces(piecesToChooseFrom)
    }

    return randomPieces
  }

  const getRandomPiece = (pieces) => {
    const newRandPiece = pieces[getRandIndex(pieces.length)]
    const pieceAlreadyInRandom = randomPieces.includes(newRandPiece)

    if(!pieceAlreadyInRandom) {
      randomPieces.push(pieces[getRandIndex(pieces.length)])
    }
  }

  useEffect(() => {
    const apiCall = async (type, userID) => {
      try {
        const data = await getData(type, userID)
        const outfit = data.allData[getRandIndex(data.allData.length)].outfit
        if (outfit.fullOutfitImage) {
          setFeaturedImage(outfit)
        } else {
          apiCall(type, userID)
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
        const items = getAllRandomPieces(data.pieces)
        setFeaturedItems([items[0], items[1], items[2], items[3]])
      } catch (error) {
        setAppError(error)
      }
    }

      if(user) {
        apiCallItem('closet', user.userID)
      }
  },[])

  const featuredPieces = () => {
    return featuredItems.map(item => {
      return (
        <div key={item.id} className='featured-piece-container'>
          <img className={`${featuredPieceClass} piece-${featuredItems.indexOf(item)}`} src={item.image} />
          <Link className='view-outfit-link' to={`closet/${item.categoryID.split('-')[1]}/${item.id}`}><div className='view-outfit-btn-home'>View item</div></Link>
        </div>
      )
    }
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