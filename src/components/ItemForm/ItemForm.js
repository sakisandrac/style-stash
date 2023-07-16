import React, { useState, useEffect } from 'react';
import './ItemForm.css';
import { v4 as uuid} from 'uuid';

const ItemForm = () => {
  const [image, setImage] = useState();
  const [notes, setNotes] = useState();
  const [category, setCategory] = useState();
  const [error, setError] = useState({error:false, message: ""});
  const [addSuccess, setAddSuccess] = useState(false);

  const [newData, setNewData] = useState({
    id: "",
    image: "",
    category:"",
    notes: ""
  });

  const handleChange = (e) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log('file state', URL.createObjectURL(e.target.files[0]))
}

  const handleSelect = (e) => {
    setCategory(e.target.value)
    console.log(category)
  }

  const handleNotes = (e) => {
    setNotes(e.target.value)
    console.log(notes)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(image && category) {
      setError({error: false, message: ""})
      setNewData({
        id: uuid(),
        image: image,
        category: category,
        notes: notes
      })
    } else {
      setError({error: true, message:`Please select both an image and category!`})
    }
  }
    
    useEffect(() => {
      console.log(newData)
    }, [newData])

  return ( 
    <div className='item-form'>
      <h2>Add Item:</h2>
      <form>
      <input type="file" onChange={handleChange} />
      <img className='file-image' src={image} />
      <textarea value={notes} onChange={handleNotes} placeholder='notes'></textarea>
      <select
        value={category}
        onChange={(e) => {handleSelect(e)}}
        name="category">
        <option>Please Select one:</option>
        <option value='pants'>Pants</option>
        <option value='skirts'>Skirts</option>
        <option value='onePieces'>One-Pieces</option>
        <option value='tops'>Tops</option>
        <option value='outerwear'>Outerwear</option>
        <option value='shoes'>Shoes</option>
        <option value='bags'>Bags</option>
        <option value='accessories'>Accessories</option>
        <option value='misc'>Miscellaneous</option>
      </select>
      <button className='add-btn' onClick={handleSubmit}>Add Item</button>
      </form>
      {error.error && <p>{error.message}</p>}

      
    </div>
  )
}

export default ItemForm