import './App.css';
import NavBar from '../NavBar/NavBar'
import Home from '../Home/Home'
import Menu from '../Menu/Menu'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';

function App() {
  const [menuOpen, setMenuOpen] = useState(true)
  const openOrCloseMenu = (setting) => {
    setting === 'open' ? setMenuOpen(true) : setMenuOpen(false)
  }

  return (
    <main>
      {menuOpen ? <NavBar openMenu={openOrCloseMenu}/> : <Menu closeMenu={openOrCloseMenu}/>}
      <Routes>
        <Route path="/" element={<Home />}/> 
      </Routes>
    </main>
  );
}

export default App;
