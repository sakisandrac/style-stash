import { Link, useParams } from 'react-router-dom';
import { getData, patchData, deleteData } from '../../apiCalls';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { useEffect, useState } from 'react';
import back from '../../images/arrow.png';
import xIcon from '../../images/close.png';
import './Piece.css';

const Piece = ({ user, appError, setAppError }) => {
  const [piece, setPiece] = useState('');
  const [editing, setEditing] = useState(false);
  const [pieceNotes, setPieceNotes] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const [otps, setOTPs] = useState([]);
  const { pieceID, category } = useParams();

  const apiCall = async () => {
    try {
      const fetchedCategory = await getData('closet', user.id, category);
      const fetchedPiece = fetchedCategory.filteredPieces.find(
        (item) => item.id === pieceID
      );
      const outfitPieces = await getData(
        'outfit-piece-amount',
        pieceID
      );
      setPiece(fetchedPiece);
      setOTPs(outfitPieces.data);
    } catch (error) {
      setAppError(error);
    }
  };

  useEffect(() => {
    apiCall();
    return () => setAppError(null);
  }, []);

  useEffect(() => {
    setPieceNotes(piece.note);
  }, [piece]);

  const handleSave = async () => {
    try {
      setPiece(
        await patchData('closet', `${pieceID}`, {
          ...piece,
          notes: pieceNotes,
        })
      );
      apiCall();
    } catch (error) {
      setAppError(error);
    }
    setEditing((prev) => !prev);
    setAddSuccess(true);
  };

  const deleteWarning = () => {
    document.querySelector('.delete-warning').showModal();
  };

  const deletePiece = async () => {
    try {
      await deleteData('piece', { id: pieceID });
      setDeleteSuccess(true);
    } catch (error) {
      setAppError(error);
    }
    document.querySelector('.delete-warning').close();
  };

  return (
    <section className="piece">
      <div className="back-to-closet">
        <Link to={`/closet/${category}`}>
          <img src={back} alt="back button" />
        </Link>
      </div>
      {appError && <ErrorMessage appError={appError} />}
      <div className="piece-cart-container">
        <section className="clothing-container">
          <img
            className="piece-cart-img"
            src={piece.image}
            alt={`clothing item from ${category} category`}
          />
        </section>
        {editing ? (
          <textarea
            className="edit-notes"
            placeholder="Add notes for this outfit..."
            value={pieceNotes}
            onChange={(e) => setPieceNotes(e.target.value)}
          />
        ) : (
          <article
            className={piece.note ? 'piece-notes' : 'piece-notes no-note'}
          >
            {piece.note ? piece.note : 'Edit item to add notes'}
          </article>
        )}
        {editing ? (
          <button
            className="edit-button"
            id="editBtn"
            onClick={() => handleSave()}
          >
            SAVE ITEM
          </button>
        ) : (
          <button
            className="edit-button"
            id="editBtn"
            onClick={() => {
              setEditing((prev) => !prev);
              setAddSuccess(false);
            }}
          >
            EDIT ITEM
          </button>
        )}
        {editing && (
          <div className="delete-container">
            <button
              className="cart-button delete-button"
              onClick={deleteWarning}
            >
              Delete Item
            </button>
            <dialog className="delete-warning">
              <button
                style={{ background: 'none', border: 'none' }}
                onClick={() => {
                  document.querySelector('.delete-warning').close();
                }}
              >
                <img src={xIcon} alt="close button" />
              </button>
              <div className="delete-warning-container">
                <p>
                  Warning: You are about to delete this item
                  {otps.length
                    ? `, and it is in ${otps.length} of your outfits`
                    : ''}
                  ! Action cannot be undone!
                </p>
                <div className="modal-button-container">
                  <button
                    className="cart-button back-btn"
                    onClick={() => {
                      document.querySelector('.delete-warning').close();
                    }}
                  >
                    CANCEL
                  </button>
                  <button
                    className="cart-button delete-button"
                    onClick={deletePiece}
                  >
                    DELELTE ITEM
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        )}
      </div>
      {addSuccess && <p className="success-text">Item Edited!</p>}
      {deleteSuccess && (
        <p className="success-text">Item Succesfully Deleted!</p>
      )}
    </section>
  );
};

export default Piece;
