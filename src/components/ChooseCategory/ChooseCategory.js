import backIcon from '../../images/arrow.png';
import CategoryContainer from '../CategoryContainer/CategoryContainer';
import { Link } from 'react-router-dom';

const ChooseCategory = ({ parentRoute, backButton, closeMenu }) => {
  return (
    <>
      {backButton && (
        <Link to={backButton}>
          <img src={backIcon} alt="back button" />
        </Link>
      )}
      <h2 style={{ textAlign: 'center', fontWeight: 'lighter' }}>
        Choose a category to add an item
      </h2>
      <CategoryContainer closeMenu={closeMenu} parentRoute={parentRoute} />
    </>
  );
};

export default ChooseCategory;
