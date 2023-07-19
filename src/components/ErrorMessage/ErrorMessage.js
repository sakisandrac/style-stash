import React from 'react'

const ErrorMessage = ( {appError }) => {
  return (
    <div>
      <p className='error-message'>{`${appError}`}</p>
    </div>
  )
}

export default ErrorMessage