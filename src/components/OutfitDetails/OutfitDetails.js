import React from 'react'
import { useParams } from 'react-router-dom'

const OutfitDetails = () => {
  const { id } = useParams();
  
  return (
    <div>outfit details</div>
  )
}

export default OutfitDetails