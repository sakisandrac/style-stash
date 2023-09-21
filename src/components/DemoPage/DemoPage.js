import React from 'react'
import { Link } from 'react-router-dom'
import './DemoPage.css'

const DemoPage = ({setUser}) => {
  
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
      <p className='login-link-btn'>Or <Link to='/login'>Click Here to Login to Style Stash</Link></p>
    </div>
  )
}

export default DemoPage