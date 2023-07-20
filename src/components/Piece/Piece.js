import { Link, useParams } from "react-router-dom"
import { getClosetData } from "../../apiCalls"
import { useEffect, useState } from "react"
import back from '../../images/arrow.png'
import './Piece.css'

const Piece = ({user}) => {
  const [piece, setPiece] = useState('')
  const {pieceID, category} = useParams()

  useEffect(() => {
    const apiCall = async () => {
      try {
        console.log(user)
        const fetchedCategory = await getClosetData(category, user.userID)
        const fetchedPiece = fetchedCategory.filteredPieces.find(item => item.id === pieceID)
        setPiece(fetchedPiece)
      } catch(error) {
        console.log(error)
      }
    }
    apiCall()
  }, [])


  return (
    <section className="piece">
      <div className='back-to-closet'><Link to={`/closet/${category}`}><img src={back} alt='back button'/></Link></div>
      <section className="cart-pieces clothing-container">
        <img src={piece.image} alt={`clothing item from ${category} category`}/> 
      </section>
      <article className={piece.notes ? "outfit-notes piece-notes" : "outfit-notes piece-notes no-note"}>
        {piece.notes ? piece.notes : 'Edit item to add notes'}
      </article>
      <button className="cart-button" id="editBtn">EDIT ITEM</button>
    </section>
  )
}

export default Piece