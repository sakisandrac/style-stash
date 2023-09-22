import backIcon from '../../../images/arrow.png';
import plus from '../../../images/add.png';
import xIcon from '../../../images/close.png';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const OutfitLanding = (props) => {
  const {
    isEditing,
    outfitID,
    toggleEditing,
    loading,
    notes,
    outfitData,
    addSuccess,
    deleteSuccess,
    pieceEls,
    newOutfitImage,
    deleteOutfit,
    deleteWarning,
    changeOutfitImage,
  } = props;
  const [outfitNotes, setOutfitNotes] = useState(notes);

  const handleChange = (e) => {
    setOutfitNotes(e.target.value);
  };

  return (
    <div className="outfit-details-container">
      <div className="back-icon-container">
        <Link to="/outfits">
          <img alt="icon for back button" src={backIcon} />
        </Link>
        {isEditing && (
          <Link to={`/outfitdetails/${outfitID}/add-piece`}>
            <img alt="icon for add item button" src={plus} />
          </Link>
        )}
      </div>
      <h1 className="page-title page-title-short">My Outfit</h1>
      <div className="pieces-container">
        <button
          className="delete-button"
          onClick={() => toggleEditing(outfitNotes)}
        >{`${isEditing ? 'Save Edits' : 'Edit Outfit'}`}</button>
        {isEditing && (
          <>
            <div className='img-upload-container'>
              <label htmlFor="fileUpload" className="upload-img-btn">
                {`${outfitData.fullOutfitImage ? 'Change' : 'Upload'
                  } Outfit Image`}
                <input
                  id="fileUpload"
                  name="fileUpload"
                  className="file-upload-default"
                  type="file"
                  onChange={(e) => {
                    changeOutfitImage(e);
                  }}
                />
              </label>
              <p>OR</p>
              <input className='url-input' type='text' name='url' onChange={(e) => changeOutfitImage(e)} placeholder='Add an image URL'></input>
            </div>
            {newOutfitImage && (
              <img className="file-image" src={newOutfitImage} />
            )}
          </>
        )}
        <div className="pieces-scroll">{pieceEls}</div>
        {isEditing ? (
          <input
            type="textarea"
            className="notes"
            onChange={(e) => handleChange(e)}
            value={outfitNotes}
            placeholder={
              outfitNotes.length > 0 ? outfitNotes : 'Add notes here...'
            }
          />
        ) : (
          <div className="notes">
            {loading
              ? 'loading...'
              : notes.length > 0
                ? notes
                : 'Add notes here...'}
          </div>
        )}
        {isEditing && (
          <div className="delete-container">
            <button
              className="cart-button delete-button"
              onClick={() => deleteWarning()}
            >
              Delete Outfit
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
                  Warning: You are about to delete this outfit! Action cannot be
                  undone!
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
                    onClick={() => {
                      deleteOutfit();
                    }}
                  >
                    DELELTE OUTFIT
                  </button>
                </div>
              </div>
            </dialog>
          </div>
        )}
        {addSuccess && <p className="success-text">Outfit Edited!</p>}
        {deleteSuccess && (
          <p className="success-text">Outfit Succesfully Deleted!</p>
        )}
      </div>
    </div>
  );
};

export default OutfitLanding;
