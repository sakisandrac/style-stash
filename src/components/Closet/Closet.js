import CategoryContainer from '../CategoryContainer/CategoryContainer'
import './Closet.css'

const Closet = ({closeMenu}) => {
  return (
    <section className='closet-page'>
      <h1 className='page-title' >My Closet</h1>
      <CategoryContainer closeMenu={closeMenu} parentRoute={'closet' }/>
    </section>
  )
}

export default Closet