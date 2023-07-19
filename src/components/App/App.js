import './App.css';
import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import Menu from '../Menu/Menu'
import Closet from '../Closet/Closet'
import Outfits from '../Outfits/Outfits'
import Piece from '../Piece/Piece';
import CategoryPage from '../CategoryPage/CategoryPage'
import ItemForm from '../ItemForm/ItemForm';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { getUserData } from '../../apiCalls';
import LoginPage from '../LoginPage/LoginPage';

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mainShown, setMainShown] = useState(true)
  const [smallScreen, setSmallScreen] = useState(false)
  const [user, setUser] = useState(null);

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
        <Route path='/closet' element={<Closet closeMenu={openOrCloseMenu}/>} />
        <Route path='/closet/:category' element={<CategoryPage closeMenu={openOrCloseMenu}/>} />
        <Route path='/closet/:category/:pieceID' element={<Piece />} />
        <Route path='/outfits' element={<Outfits />} />
        <Route path="/itemform" element={<ItemForm />} />
        <Route path="/login" element={<LoginPage setUser={setUser} user={user}/>} />
      </Routes>}
    </main>
  );
}

export default App;
