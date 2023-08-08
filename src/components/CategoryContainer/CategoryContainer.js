import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const CategoryContainer = ({closeMenu, parentRoute}) => {
  const categories = ['Pants', 'Skirts', 'Tops', 'One Pieces', 'Outer Wear', 'Bags', 'Shoes', 'Accessories', 'Miscellaneous'];
  const categoryEls = categories.map(category => {
    const id = uuidv4();
    const linkLocation = category.split(' ').join('').toLowerCase();
    return <Link to={`/${parentRoute}/${linkLocation}`} className='closet-link category' key={id} id={id} onClick={() => closeMenu('close')}><p className='category-text'>{category}</p></Link>
  });

  return (
      <div className='category-container'>
        {categoryEls}
      </div>
  )
}

export default CategoryContainer