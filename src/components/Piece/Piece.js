import { Link, useParams } from "react-router-dom"
import { getClosetData } from "../../apiCalls"
import { useEffect, useState } from "react"
import back from '../../images/arrow.png'
import './Piece.css'

const Piece = ({user}) => {
  const [piece, setPiece] = useState('')
  const [editing, setEditing] = useState(false)
  const [pieceNotes, setPieceNotes] = useState('')
  const {pieceID, category} = useParams()

  useEffect(() => {
    console.log('mounting...')
    const apiCall = async () => {
      try {
        const fetchedCategory = await getClosetData(category, user.userID)
        const fetchedPiece = fetchedCategory.filteredPieces.find(item => item.id === pieceID)
        setPiece(fetchedPiece)
        console.log(fetchedPiece)
      } catch(error) {
        console.log(error)
      }
    }
    apiCall()
  }, [])

  useEffect(() => {
    setPieceNotes(piece.notes)
  }, [piece])

  useEffect(() => {
    console.log('editing', editing)
  }, [editing])


  return (
    <section className="piece">
      <div className='back-to-closet'><Link to={`/closet/${category}`}><img src={back} alt='back button'/></Link></div>
      <section className="cart-pieces clothing-container">
        <img src={piece.image} alt={`clothing item from ${category} category`}/> 
      </section>
      {editing ? <input className='outfit-notes' type='textarea' placeholder="Add notes for this outfit..." value={pieceNotes} onChange={(e) => setPieceNotes(e.target.value)}/>
      : <article className={piece.notes ? "outfit-notes piece-notes" : "outfit-notes piece-notes no-note"}>
        {piece.notes ? piece.notes : 'Edit item to add notes'}
      </article>}
      <button className="cart-button" id="editBtn" onClick={() => setEditing(prev => !prev)}>{editing ? 'SAVE' : 'EDIT'} ITEM</button>
    </section>
  )
}

export default Piece