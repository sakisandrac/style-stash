import { Link, useParams } from "react-router-dom"
import { getData, patchData } from "../../apiCalls"
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import { useEffect, useState } from "react"
import back from '../../images/arrow.png'
import './Piece.css'

const Piece = ({user, appError, setAppError}) => {
  const [piece, setPiece] = useState('')
  const [editing, setEditing] = useState(false)
  const [pieceNotes, setPieceNotes] = useState('')
  const [addSuccess, setAddSuccess] = useState(false)
  const {pieceID, category} = useParams()

  const apiCall = async () => {
    try {
      const fetchedCategory = await getData('closet', user.userID, category)
      const fetchedPiece = fetchedCategory.filteredPieces.find(item => item.id === pieceID)
      setPiece(fetchedPiece)
    } catch(error) {
      setAppError(error)
    }
  }
  
  useEffect(() => {
    apiCall()
    return () => setAppError(null)
  }, [])

  useEffect(() => {
    setPieceNotes(piece.notes)
  }, [piece])

  const handleSave = async() => {
    try {
      setPiece( await patchData('closet', `${user.userID}/${pieceID}`, {...piece, notes: pieceNotes}))
      apiCall()
    } catch(error) {
      setAppError(error)
    }
    setEditing(prev => !prev)
    setAddSuccess(true)
  }

  return (
    <section className="piece">
      <div className='back-to-closet'><Link to={`/closet/${category}`}><img src={back} alt='back button'/></Link></div>
      {appError && <ErrorMessage appError={appError}/>}
      <div className="piece-cart-container">
        <section className="cart-pieces clothing-container">
          <img src={piece.image} alt={`clothing item from ${category} category`} />
        </section>
        {editing ? <textarea className='edit-notes' placeholder="Add notes for this outfit..." value={pieceNotes} onChange={(e) => setPieceNotes(e.target.value)} />
          : <article className={piece.notes ? "piece-notes" : "piece-notes no-note"}>
            {piece.notes ? piece.notes : 'Edit item to add notes'}
          </article>}
        {editing
          ? <button className="edit-button" id="editBtn" onClick={() => handleSave()}>SAVE ITEM</button>
          : <button
            className="edit-button"
            id="editBtn"
            onClick={() => {
              setEditing(prev => !prev)
              setAddSuccess(false)
            }}>
            EDIT ITEM
          </button>
        }
      </div>
      {addSuccess && <p>Item Edited!</p>}
    </section>
  )
}

export default Piece