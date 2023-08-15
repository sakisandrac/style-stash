import React from 'react'
import { Link } from 'react-router-dom'
import './DemoPage.css'

const DemoPage = ({setUser}) => {
  return (
    <div className='demo-page'>
      <section>
        <h1>Welcome to Style Stash!</h1>
        <h2>Choose a closet to demo:</h2>
        <div className='users-container'>
          <Link to="/" onClick={() => setUser({id: 2})}><img className='demo-img' src='https://i.imgur.com/HTPUB29.jpeg' alt='demo image of Laura G'/></Link>
          <Link to="/" onClick={() => setUser({id: 1})}><img className='demo-img'  src='https://i.imgur.com/2ZBY3ix.jpg' alt='demo image of Saki C' /></Link>
        </div>
      </section>
      <p>Or Please <Link to='/login'>Login to Style Stash</Link></p>
    </div>
    
  )
}

export default DemoPage