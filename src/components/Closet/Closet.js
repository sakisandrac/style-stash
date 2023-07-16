import { v4 as uuidv4 } from 'uuid';
import Category from '../Category/Category';
import './Closet.css'

const Closet = () => {
  const categories = ['Pants', 'Skirts', 'Shirts', 'One Pieces', 'Outer Wear', 'Bags', 'Shoes', 'Accessories', 'Other']
  const categoryEls = categories.map(category => {
    const id = uuidv4();
   return <Category key={id} id={id} name={category}/>
  })

  return (
    <section className='closet-page'>
      <div className='category-container'>
        {categoryEls}
      </div>
    </section>
  )
}

export default Closet