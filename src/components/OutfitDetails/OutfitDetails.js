import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import CategoryPage from '../CategoryPage/CategoryPage';
import OutfitLanding from './OutfitLanding/OutfitLanding';
import { getData, patchData, postData, deleteData } from '../../apiCalls';
import './OutfitDetails.css';
import xIcon from '../../images/close.png';
import ChooseCategory from '../ChooseCategory/ChooseCategory';

const OutfitDetails = ({ user, setAppError, appError, closeMenu }) => {
  const outfitID = useParams().id;
  const [pieces, setPieces] = useState(null);
  const [outfitData, setOutfitData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [notes, setNotes] = useState(outfitData?.notes);
  const [loading, setLoading] = useState(true);
  const [newOutfitImage, setNewOutfitImage] = useState('');
  const [addSuccess, setAddSuccess] = useState(false);
  const [deletedPieces, setDeletedPieces] = useState([]);
  const [newPieces, setNewPieces] = useState([]);
  const [deleteSuccess, setDeleteSuccess] = useState(false);
  const location = useLocation();
  const categoryInUrl = useParams().category;

  useEffect(() => {
    const apiCall = async (type, outfitID) => {
      setLoading(true);
      try {
        const data = await getData(type, outfitID);
        setPieces(data.outfitPieces);
        setOutfitData(data.outfitData);
        setNotes(data.outfitData.notes);
        setLoading(false);
      } catch (error) {
        setAppError(error);
      }
    };
    if (user) {
      apiCall('outfit', outfitID);
    }
  }, []);

  const removePiece = (currentPiece) => {
    const filteredPieces = pieces.filter(
      (piece) => piece.id !== currentPiece.id
    );
    setPieces(filteredPieces);
    setDeletedPieces((prev) => [...prev, currentPiece.id]);
  };

  const addPiece = (piece) => {
    setPieces((prev) => [...prev, piece]);
    setNewPieces((prev) => [...prev, piece.id]);
  };

  const deleteWarning = () => {
    document.querySelector('.delete-warning').showModal();
  };

  const deleteOutfit = () => {
    deleteData('outfits', { id: outfitID });
    setDeleteSuccess(true);
    document.querySelector('.delete-warning').close();
  };

  const checkForItem = (id) => {
    return pieces.find((item) => item.id === id) ? true : false;
  }

  const pieceEls = pieces?.map((piece) => {
    return (
      <div key={piece.id} className="piece-image-container">
        <img
          className="piece-image"
          alt="piece of clothing"
          src={piece.image}
        />
        {isEditing && (
          <img
            alt="icon to remove item"
            src={xIcon}
            onClick={() => {
              removePiece(piece);
            }}
          />
        )}
      </div>
    );
  });

  const toggleEditing = (notes) => {
    setNotes(notes);
    setIsEditing((prev) => !prev);
    setAddSuccess(false);

    if (isEditing) {
      setAddSuccess(true);
    }
  };

  const changeOutfitImage = (e) => {
    if(e.target.name === 'fileUpload') {
      setNewOutfitImage(URL.createObjectURL(e.target.files[0]))
    } 

    if(e.target.name === 'url') {
      setNewOutfitImage(e.target.value)
    }
  };

  useEffect(() => {
    const apiCall = async () => {
      try {
        let newOutfit = await patchData(
          'outfit',
          `${outfitData.id}`,
          {
            notes,
            fullOutfitImage: newOutfitImage
              ? newOutfitImage
              : outfitData.fullOutfitImage,
          }
        );

        deletedPieces.forEach((id) => {
          deleteData('outfit-to-pieces', {
            outfitID: outfitData.id,
            pieceID: id,
          });
        });

        newPieces.forEach((id) => {
          postData('outfit-to-pieces', {
            outfitID: outfitData.id,
            pieceID: id,
          });
        });
      } catch (error) {
        setAppError(error);
      }
    };

    if (addSuccess) {
      apiCall();
    }
  }, [addSuccess]);

  const MainContent = () => {
    if (categoryInUrl) {
      return (
        <CategoryPage
          removeFromCart={removePiece}
          addToCart={addPiece}
          checkCartForItem={checkForItem}
          outfitID={outfitID}
          setAppError={setAppError}
          user={user}
        />
      );
    } else if (location.pathname.includes('add-piece')) {
      return (
        <ChooseCategory
          parentRoute={`outfitdetails/${outfitID}/add-piece`}
          backButton={`/outfitdetails/${outfitID}`}
          closeMenu={closeMenu}
        />
      );
    } else {
      return (
        <OutfitLanding
          isEditing={isEditing}
          outfitID={outfitID}
          toggleEditing={toggleEditing}
          loading={loading}
          notes={notes}
          outfitData={outfitData}
          addSuccess={addSuccess}
          deleteSuccess={deleteSuccess}
          pieceEls={pieceEls}
          newOutfitImage={newOutfitImage}
          deleteWarning={deleteWarning}
          deleteOutfit={deleteOutfit}
          changeOutfitImage={changeOutfitImage}
        />
      );
    }
  };

  return (
    <div className="outfit-page">
      {appError && <ErrorMessage appError={appError} />}
      {user ? <MainContent /> : <p>Please login to continue</p>}
    </div>
  );
};

export default OutfitDetails;
