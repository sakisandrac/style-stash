import './App.css';
import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import Menu from '../Menu/Menu'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [mainShown, setMainShown] = useState(true)
  const [smallScreen, setSmallScreen] = useState(false)

  const openOrCloseMenu = (setting) => {
    setting === 'open' ? setMenuOpen(true) : setMenuOpen(false)
  }

  const resizeScreen = () => {
    window.innerWidth < 600 
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
      {menuOpen ? <Menu closeMenu={openOrCloseMenu}/> : <NavBar openMenu={openOrCloseMenu}/>}
      {mainShown && 
      <Routes>
        <Route path="/" element={<Home />}/> 
      </Routes>}
    </main>
  );
}

export default App;
