import React from 'react';

const ErrorMessage = ({appError}) => {
  return (
    <div>
      <p className='error-message'>{`${appError} - Please try again!`}</p>
    </div>
  )
}

export default ErrorMessage