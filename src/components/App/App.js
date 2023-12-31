import './App.css';
import NavBar from '../NavBar/NavBar';
import Home from '../Home/Home';
import Menu from '../Menu/Menu';
import Closet from '../Closet/Closet';
import Outfits from '../Outfits/Outfits';
import Piece from '../Piece/Piece';
import CategoryPage from '../CategoryPage/CategoryPage';
import OutfitForm from '../OutfitForm/OutfitForm';
import ItemForm from '../ItemForm/ItemForm';
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import OutfitDetails from '../OutfitDetails/OutfitDetails';
import DemoPage from '../DemoPage/DemoPage';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import AboutUs from '../AboutUs/AboutUs';

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mainShown, setMainShown] = useState(true);
  const [smallScreen, setSmallScreen] = useState(false);
  const [appError, setAppError] = useState(null);
  const [user, setUser] = useState(null);

  const openOrCloseMenu = (setting) => {
    setting === 'open' ? setMenuOpen(true) : setMenuOpen(false);
  };

  const resizeScreen = () => {
    window.innerWidth <= 740 
      ? setSmallScreen(true)
      : setSmallScreen(false);
  };

  useEffect(() => {
    resizeScreen();
    window.addEventListener('resize', resizeScreen);
    return () => window.removeEventListener('resize', resizeScreen);
  }, [menuOpen]);

  useEffect(() => {
    menuOpen && smallScreen 
      ? setMainShown(false)
      : setMainShown(true);
  }, [menuOpen, smallScreen]);

  return (
    <main className={menuOpen ? 'row-flex' : ''}>
      {menuOpen ? <Menu closeMenu={openOrCloseMenu}/> : <NavBar user={user} setUser={setUser} openMenu={openOrCloseMenu}/>}
      {mainShown &&
      <Routes>
        <Route path="/" element={user? <Home menuOpen={menuOpen} user={user} setUser={setUser} setAppError={setAppError}/> : <DemoPage setUser={setUser}/>}/> 
        <Route path='/closet' element={<Closet user={user} closeMenu={openOrCloseMenu}/>} />
        <Route path='/closet/:category' element={<CategoryPage user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/closet/:category/:pieceID' element={<Piece user={user} appError={appError} setAppError={setAppError}/>} />
        <Route path="/login" element={<LoginPage appError={appError} setAppError={setAppError} setUser={setUser} user={user}/>} />
        <Route path='/outfits' element={<Outfits appError={appError} setAppError={setAppError} user={user} closeMenu={openOrCloseMenu}/>} />
        <Route path="/itemform" element={<ItemForm user={user}/>} />
        <Route path='/outfitform' element={<OutfitForm appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/outfitform/:category' element={<OutfitForm user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/outfitdetails/:id' element={<OutfitDetails user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/outfitdetails/:id/add-piece' element={<OutfitDetails user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/outfitdetails/:id/add-piece/:category' element={<OutfitDetails user={user} appError={appError} setAppError={setAppError} closeMenu={openOrCloseMenu}/>} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='*' element={<ErrorMessage appError={'404'}/>} />
      </Routes>}
    </main>
  );
}

export default App;



