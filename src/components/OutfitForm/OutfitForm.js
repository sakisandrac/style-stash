import '../Closet/Closet.css'
import CategoryContainer from "../CategoryContainer/CategoryContainer"
import CategoryPage from '../CategoryPage/CategoryPage'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const OutfitForm = ({closeMenu}) => {
const ChooseCategory = () => {
  return (
    <>
      <h2 style={{textAlign: "center", fontWeight: "lighter"}}>Choose a category to add an item</h2>
      <CategoryContainer closeMenu={closeMenu} parentRoute={'outfitform'}/>
    </>
  )
}

const AddItem = () => {
  return (
    <section>
      <CategoryPage />
    </section>
  )
}

return (
  <section className='closet-page'>
    {useParams().category ? <AddItem /> : <ChooseCategory />}
  </section>
)
}

export default OutfitForm