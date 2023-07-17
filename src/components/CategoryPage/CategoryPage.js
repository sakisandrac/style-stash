import { useParams, Link } from "react-router-dom"
import placeholder from '../../images/placeholder.png'
import './CategoryPage.css'

const CategoryPage = ({closeMenu}) => {
  //this fake data will be removed after connecting the backend 
  const allPieces = [
    {
    id: "PIE-tops-ex-1",
    image: placeholder,
    categoryID: 'CAT-tops',
    notes: ""
    }, 
    {
      id: "PIE-tops-ex-2",
      image: placeholder,
      categoryID: "CAT-tops",
      notes: ""
    },
    {
      id: "PIE-skirts-ex-1",
      image: placeholder,
      categoryID: "CAT-skirts",
      notes: ""
    },
    {
      id: "PIE-onepiece-ex-1",
      image: placeholder,
      categoryID: "CAT-onepieces",
      notes: ""
    },
    {
      id: "PIE-shoes-ex-1",
      image: placeholder,
      categoryID: "CAT-shoes",
      notes: ""
    },
    {
      id: "PIE-bag-ex-1",
      image: placeholder,
      categoryID: "CAT-bags",
      notes: ""
    },
    {
      id: "PIE-accessories-ex-1",
      image: placeholder,
      categoryID: "CAT-accessories",
      notes: ""
    },
    {
      id: "PIE-outerwear-ex-1",
      image: placeholder,
      categoryID: "CAT-outerwear",
      notes: ""
    },
    {
      id: "PIE-misc-ex-1",
      image: placeholder,
      categoryID: "CAT-miscellaneous",
      notes: ""
    }
  ]
  
  //this will be a network request --> 
  const category = useParams().category
  const pieces = allPieces.filter(piece => piece.categoryID.split('-')[1] === category)
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