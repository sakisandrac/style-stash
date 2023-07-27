import './App.css';
import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import Menu from '../Menu/Menu'
import Closet from '../Closet/Closet'
import Outfits from '../Outfits/Outfits'
import Piece from '../Piece/Piece';
import CategoryPage from '../CategoryPage/CategoryPage'
import OutfitForm from '../OutfitForm/OutfitForm';
import ItemForm from '../ItemForm/ItemForm';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import OutfitDetails from '../OutfitDetails/OutfitDetails';

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mainShown, setMainShown] = useState(true)
  const [smallScreen, setSmallScreen] = useState(false)
  const [appError, setAppError] = useState(null);
  const [user, setUser] = useState({
    "userID": "USE-user-ex-1",
    "credentials": {
        "username": "user1",
        "password": "1234"
    },
    "pieces": [
        {
            "id": "PIE-pants-ex-1",
            "image": "https://i.imgur.com/ddninn4.jpg",
            "categoryID": "CAT-pants",
            "notes": ""
        },
        {
            "id": "PIE-tops-ex-1",
            "image": "https://i.imgur.com/mCvW03T.jpg",
            "categoryID": "CAT-tops",
            "notes": ""
        },
        {
            "id": "PIE-skirts-ex-1",
            "image": "https://i.imgur.com/GVKEPiN.jpg",
            "categoryID": "CAT-skirts",
            "notes": ""
        },
        {
            "id": "PIE-onepiece-ex-1",
            "image": "https://i.imgur.com/mroP74J.jpg",
            "categoryID": "CAT-onepieces",
            "notes": ""
        },
        {
            "id": "PIE-shoes-ex-1",
            "image": "https://i.imgur.com/xQNPDND.jpg",
            "categoryID": "CAT-shoes",
            "notes": ""
        },
        {
            "id": "PIE-bag-ex-1",
            "image": "https://i.imgur.com/tjrHoPs.jpg",
            "categoryID": "CAT-bags",
            "notes": ""
        },
        {
            "id": "PIE-accessories-ex-1",
            "image": "https://i.imgur.com/aWoR9up.jpg",
            "categoryID": "CAT-accessories",
            "notes": ""
        },
        {
            "id": "PIE-outerwear-ex-1",
            "image": "https://i.imgur.com/Tm2gIqW.jpg",
            "categoryID": "CAT-outerwear",
            "notes": ""
        },
        {
            "id": "PIE-misc-ex-1",
            "image": "https://i.imgur.com/eSO0N4s.jpg",
            "categoryID": "CAT-miscellaneous",
            "notes": ""
        }
    ],
    "categories": [
        {
            "id": "CAT-pants",
            "name": "Pants"
        },
        {
            "id": "CAT-tops",
            "name": "Tops"
        },
        {
            "id": "CAT-skirts",
            "name": "Skirts"
        },
        {
            "id": "CAT-onepieces",
            "name": "One Pieces"
        },
        {
            "id": "CAT-shoes",
            "name": "Shoes"
        },
        {
            "id": "CAT-bags",
            "name": "Bags"
        },
        {
            "id": "CAT-accessories",
            "name": "Accessories"
        },
        {
            "id": "CAT-outerwear",
            "name": "Outer Wear"
        },
        {
            "id": "CAT-miscellaneous",
            "name": "Miscellaneous"
        }
    ],
    "outfitToPieces": [
        {
            "id": "OTP-otp-ex-1",
            "outfitID": "OUT-outfit-ex-1",
            "pieceID": "PIE-pants-ex-1"
        },
        {
            "id": "OTP-otp-ex-2",
            "outfitID": "OUT-outfit-ex-1",
            "pieceID": "PIE-tops-ex-1"
        },
        {
            "id": "OTP-otp-ex-3",
            "outfitID": "OUT-outfit-ex-1",
            "pieceID": "PIE-accessories-ex-1"
        },
        {
            "id": "OTP-otp-ex-4",
            "outfitID": "OUT-outfit-ex-1",
            "pieceID": "PIE-shoes-ex-1"
        },
        {
            "id": "OTP-otp-ex-5",
            "outfitID": "OUT-outfit-ex-1",
            "pieceID": "PIE-bags-ex-1"
        },
        {
            "id": "OTP-otp-ex-6",
            "outfitID": "OUT-outfit-ex-2",
            "pieceID": "PIE-onepiece-ex-1"
        },
        {
            "id": "OTP-otp-ex-7",
            "outfitID": "OUT-outfit-ex-2",
            "pieceID": "PIE-outerwear-ex-1"
        },
        {
            "id": "OTP-otp-ex-8",
            "outfitID": "OUT-outfit-ex-2",
            "pieceID": "PIE-shoes-ex-1"
        },
        {
            "id": "OTP-otp-ex-9",
            "outfitID": "OUT-outfit-ex-2",
            "pieceID": "PIE-bags-ex-1"
        }
    ],
    "outfits": [
        {
            "id": "OUT-outfit-ex-1",
            "fullOutfitImage": "./outfit.JPG",
            "notes": ""
        },
        {
            "id": "OUT-outfit-ex-2",
            "fullOutfitImage": "./outfit2.png",
            "notes": ""
        }
    ]
});


  const openOrCloseMenu = (setting) => {
    setting === 'open' ? setMenuOpen(true) : setMenuOpen(false)
  }

  const resizeScreen = () => {
    window.innerWidth <= 700 
      ? setSmallScreen(true)
      : setSmallScreen(false)
  }

  useEffect(() => {
    resizeScreen()
    window.addEventListener('resize', resizeScreen)
    return () => window.removeEventListener('resize', resizeScreen)
  }, [menuOpen])

  useEffect(() => {
    menuOpen && smallScreen 
      ? setMainShown(false)
      : setMainShown(true)
  }, [menuOpen, smallScreen])

  return (
    <main className={menuOpen ? 'row-flex' : ''}>
      {menuOpen ? <Menu closeMenu={openOrCloseMenu}/> : <NavBar user={user} setUser={setUser} openMenu={openOrCloseMenu}/>}
      {mainShown &&
      <Routes>
        <Route path="/" element={<Home />}/> 
        <Route path='/closet' element={<Closet user={user} closeMenu={openOrCloseMenu}/>} />
        <Route path='/closet/:category' element={<CategoryPage user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/closet/:category/:pieceID' element={<Piece user={user} appError={appError} setAppError={setAppError}/>} />
        <Route path="/login" element={<LoginPage appError={appError} setAppError={setAppError} setUser={setUser} user={user}/>} />
        <Route path='/outfits' element={<Outfits appError={appError} setAppError={setAppError} user={user} closeMenu={openOrCloseMenu}/>} />
        <Route path="/itemform" element={<ItemForm user={user}/>} />
        <Route path='/outfitform' element={<OutfitForm closeMenu={openOrCloseMenu}/>} />
        <Route path='/outfitform/:category' element={<OutfitForm user={user} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/outfitdetails/:id' element={<OutfitDetails user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/outfitdetails/:id/add-piece' element={<OutfitDetails user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/outfitdetails/:id/add-piece/:category' element={<OutfitDetails user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
      </Routes>}
    </main>
  );
}

export default App;
