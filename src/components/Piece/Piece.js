import { Link, useParams } from "react-router-dom"

const Piece = () => {
  return (
    <section className="piece">
      <Link to={`/closet/${useParams().category}`} style={{color: 'black', textDecoration: 'none'}}>BACK TO ALL {useParams().category.toUpperCase()}</Link>
      <p>A clothing item and it's details will appear here</p>
    </section>
  )
}

export default Piece