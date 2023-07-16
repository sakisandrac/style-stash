import { useParams, Link } from "react-router-dom"
import placeholder from '../../images/placeholder.png'

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
          id: 10,
          image: placeholder
        }
      ],
      shirts: [
        {
          id: 2,
          image: placeholder
        }
      ],
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
      misc: [
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
  
  console.log(allPieces.pants[0].image)
  return (
    <section className='category-page'>
      <h1 className='page-title' >{category.toUpperCase()}</h1>
      <section className='piece-container'>
        {pieceEls}
      </section>
    </section>
  )
}

export default CategoryPage