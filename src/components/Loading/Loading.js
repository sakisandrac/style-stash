import React from 'react';
import './Loading.css';
import loader from '../../images/pinkloader.gif';

const Loading = () => {
  return (
    <div className='loading-page'>
     <img src={loader} alt="spinning loader" />
     <h2>Loading... Please Wait One Moment!</h2>
    </div>
  )
}

export default Loading