import React from 'react'
import { Link } from 'react-router-dom'
import './DemoPage.css'

const DemoPage = ({setUser}) => {


  const openModal = () => {
    const modal = document.querySelector('#aboutModal')
    modal.showModal()
  }

  const closeModal = () => {
    const modal = document.querySelector('#aboutModal')
    modal.close()
  }

  return (
    <div className='demo-page'>
      <section className='demo-container'>
        <h1 className='welcome-text'>Welcome to Style Stash!</h1>
        <h2>Choose a closet to demo:</h2>
        <div className='users-container'>
          <Link to="/" onClick={() => setUser({id: 2})} className='demo1'><img className='demo-img' src='https://i.imgur.com/HTPUB29.jpeg' alt='demo image of Laura G'/>
            <div className='user-name'><p className='name-tag'>Laura G.</p></div>
            </Link>
          <Link to="/" onClick={() => setUser({id: 1})} className='demo1'><img className='demo-img'  src='https://i.imgur.com/2ZBY3ix.jpg' alt='demo image of Saki C' />
            <div className='user-name'><p className='name-tag'>Saki C.</p></div>
          </Link>
        </div>
      </section>
      <button className='login-link-btn' onClick={openModal}>About the Creators</button>
      <dialog id="aboutModal">
          <div className='modal-container'>
            <p className='page-title about-title'>About the Style Stash Creators</p>
            <p className='info-text'><a href="https://www.linkedin.com/in/saki-c-a7306b259/"><span className='linked'>Saki C</span></a></p>
            <p className='info-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p className='info-text'><a href="https://www.linkedin.com/in/laura-garcia-guerra/"><span className='linked'>Laura G</span></a></p>
            <p className='info-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            
            <button className='login-link-btn' onClick={closeModal}>Close</button>
          </div>
        </dialog>
      <p className='login-link-btn'>Or <Link to='/login'>Click Here to Login to Style Stash</Link></p>
    </div>
    
  )
}

export default DemoPage