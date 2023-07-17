import { useParams, Link } from "react-router-dom"
import placeholder from '../../images/placeholder.png'
import './CategoryPage.css'

const CategoryPage = ({closeMenu}) => {
  //this fake data will be removed after connecting the backend 
  const allPieces = 
    {
      pants: [
        {
          id: 1,
          image: placeholder
        },
        {
          id: 2,
          image: placeholder
        }
      ],
      tops: [],
      skirts: [
        {
          id: 3,
          image: placeholder
        }
      ],
      onePieces: [
        {
          id: 4,
          image: placeholder
        }
      ],
      shoes: [
        {
          id: 5,
          image: placeholder
        }
      ],
      bags: [
        {
          id: 6,
          image: placeholder
        }
      ],
      accessories: [
        {
          id: 7,
          image: placeholder
        }
      ],
      outerwear: [
        {
          id: 8,
          image: placeholder
        }
      ],
      miscellaneous: [
        {
          id: 9,
          image: placeholder
        }
      ],
    } 
  
  //this will be a network request --> 
  const category = useParams().category
  const pieces = allPieces[category]
  const pieceEls = pieces.map(piece => 
  <Link to={`/closet/${category}/${piece.id}`} className='piece-link closet-link' key={piece.id} id={piece.id} onClick={() => closeMenu('close')} >
    <img src={piece.image} />
  </Link>)
  
  return (
    <section className='category-page'>
      <h1 className='page-title' >{category.toUpperCase()}</h1>
      <section className='piece-container'>
        {pieces.length ? pieceEls : <p>No items in the {category} category yet! Add to your collection to get started!</p>}
      </section>
    </section>
  )
}

export default CategoryPage