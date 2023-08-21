import React from 'react';
import './AboutUs.css';
import sakiPic from '../../images/saki-profile.jpg';

const AboutUs = () => {
  return (
    <div className='about-page'>
       <p className='page-title about-title'>About the Style Stash Creators</p>
       <section className='about-container'>
        <div className='about-pic'>
          <img className='about-img' alt='Saki co creater of Style Stash'src={sakiPic}/>
        </div>
        <div className='about-info'>
          <p className='about-name'>Saki C</p>
          <p className='info-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div className='btn-container'>
            <button className='login-link-btn'><a href="https://www.linkedin.com/in/saki-c-a7306b259/" target="_blank" rel="noreferrer">LinkedIn</a></button>
            <button className='login-link-btn'><a href="https://github.com/sakisandrac" target="_blank" rel="noreferrer">GitHub</a></button>
          </div>
        </div>
       </section>
       <section className='about-container'>
        <div className='about-info'>
          <p className='about-name'>Laura G</p>
          <p className='info-text'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          <div className='btn-container'>
            <button className='login-link-btn'><a href="https://www.linkedin.com/in/laura-garcia-guerra/" target="_blank" rel="noreferrer">LinkedIn</a></button>
            <button className='login-link-btn'><a href="https://github.com/lauraguerra1" target="_blank" rel="noreferrer">GitHub</a></button>
          </div>
        </div>
        <div className='about-pic'>
          <img className='about-img' alt='Laura co creater of Style Stash'src='https://i.imgur.com/phQ7cly.jpeg'/>
        </div>
       </section>
    </div>
  )
}

export default AboutUs