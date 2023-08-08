import { Link } from 'react-router-dom';

const OutfitCover = ({ outfit }) => {
  const outfitPieceImgs = (outfit) => {
    const allImages = outfit.outfitPieces.map((piece) => {
      return <img key={piece.id} className="piece-img" src={piece.image} />;
    });
    return allImages.slice(0, 4);
  };
  return (
    <Link key={outfit.outfit.id} to={`/outfitdetails/${outfit.outfit.id}`}>
      <div className="outfit-img-container">
        {outfit.outfit.fullOutfitImage && (
          <img
            className="full-outfit-img"
            src={outfit.outfit.fullOutfitImage}
            alt={`image of outfit ${outfit.outfit.id}`}
          />
        )}
        {!outfit.outfit.fullOutfitImage && outfitPieceImgs(outfit)}
        <div className="overlay"></div>
        <div className="view-outfit-btn">View my outfit</div>
      </div>
    </Link>
  );
};

export default OutfitCover;
