import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';
import './Closet.css'

const Closet = ({closeMenu}) => {
  const categories = ['Pants', 'Skirts', 'Tops', 'One Pieces', 'Outer Wear', 'Bags', 'Shoes', 'Accessories', 'Miscellaneous']
  const categoryEls = categories.map(category => {
    const id = uuidv4();
    const linkLocation = category.split(' ').join('').toLowerCase()
    return <Link to={`/closet/${linkLocation}`} className='closet-link category' key={id} id={id} onClick={() => closeMenu('close')}>{category}</Link>
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