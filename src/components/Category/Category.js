import './Category.css'

const Category = ({name}) => {
  return (
    <section className='category'>
      <p>{name}</p>
    </section>
  )
}

export default Category