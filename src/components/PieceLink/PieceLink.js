import { Link } from "react-router-dom"

const PieceLink = ({category, piece, closeMenu}) => {
  return (
    <Link to={`/closet/${category}/${piece.id}`} className='piece-link closet-link'  id={piece.id} onClick={() => closeMenu('close')} >
        <img src={piece.image} />
      </Link>
  )
}

export default PieceLink