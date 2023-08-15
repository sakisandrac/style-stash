import { useEffect, useState } from 'react';
import add from '../../images/add.png';
import { Link } from 'react-router-dom';
import { getData } from '../../apiCalls';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import OutfitCover from './OutfitCover/OutfitCover';
import './Outfits.css';

const Outfits = ({ setAppError, closeMenu, user, appError }) => {
  const [outfits, setOutfits] = useState();

  useEffect(() => {
    const apiCall = async (type, userID) => {
      try {
        const data = await getData(type, userID);
        setOutfits(data.allData);
        setAppError(null);
      } catch (error) {
        setAppError(error);
      }
    };

    if (user) {
      apiCall('outfits', user.id);
    }

    return () => setAppError(null);
  }, []);

  const userOutfitImages = outfits?.map((outfit) => {
    return <OutfitCover outfit={outfit} />;
  });

  return (
    <>
      {appError && <ErrorMessage appError={appError} />}
      {user ? (
        <div className="my-outfits-container">
          <Link
            to="/outfitform"
            className="menu-btn add-btn"
            onClick={() => closeMenu('close')}
          >
            <img src={add} alt="close button" />
          </Link>
          <h1 className="page-title">My Outfits</h1>
          <div className="outfits-container">{userOutfitImages}</div>
        </div>
      ) : (
        <p>Please Login to Continue</p>
      )}
    </>
  );
};

export default Outfits;
