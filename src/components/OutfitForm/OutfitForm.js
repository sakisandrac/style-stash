import '../Closet/Closet.css'
import CategoryContainer from "../CategoryContainer/CategoryContainer"
import hanger from '../../images/hanger.png'
import add from '../../images/add.png'
import { Link, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import CategoryPage from '../CategoryPage/CategoryPage'

const OutfitForm = ({closeMenu}) => {
const [cart, setCart] = useState([])

const ChooseCategory = () => {
  return (
    <>
      <h2 style={{textAlign: "center", fontWeight: "lighter"}}>Choose a category to add an item</h2>
      <CategoryContainer closeMenu={closeMenu} parentRoute={'outfitform'}/>
    </>
  )
}


return (
  <section className='closet-page'>
    <Link to='/cart'><img src={hanger}/></Link>
    {useParams().category ? <CategoryPage /> : <ChooseCategory />}
  </section>
)
}

export default OutfitForm