import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './Closet.css'

const Closet = () => {
  const categories = ['Pants', 'Skirts', 'Shirts', 'One Pieces', 'Outer Wear', 'Bags', 'Shoes', 'Accessories', 'Other']
  const categoryEls = categories.map(category => {
    const id = uuidv4();
    const linkLocation = category.split(' ').join('').toLowerCase()
    return <Link to={`/closet/${linkLocation}`} className='category' key={id} id={id} >{category}</Link>
  })

  return (
    <section className='closet-page'>
      <h1 className='page-title' >My Closet</h1>
      <div className='category-container'>
        {categoryEls}
      </div>
    </section>
  )
}

export default Closet