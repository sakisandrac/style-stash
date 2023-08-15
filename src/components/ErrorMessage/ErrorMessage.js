import React from 'react'
import sign from '../../images/404.png';
import './ErrorMessage.css'

const ErrorMessage = ({ appError }) => {
  const errorMsg = () => {
    if (appError === '404') {
      return <img alt='404 not found' src={sign} />
    } else {
      return <p className='error-message'>{`${appError}`}</p>
    } 
  }

  return (
    <div className='error-page'>
      {errorMsg()}
    </div>
  )
}

export default ErrorMessage