import React, { useState } from 'react';
import './ItemForm.css'

const ItemForm = () => {
  const [imgFile, setImgFile] = useState();
  const [notes, setNotes] = useState();
  const [category, setCategory] = useState();

  const [newData, setNewData] = useState({
    id: "",
    image: "",
    category:"",
    notes: ""
  });

  const handleChange = (e) => {
    console.log(e.target.files);
    setImgFile(URL.createObjectURL(e.target.files[0]));
    console.log('file state', URL.createObjectURL(e.target.files[0]))
}

  const handleSelect = (e) => {
    setCategory(e.target.value)
    console.log(category)
  }

  return ( 
    <div className='item-form'>
      <h2>Add Item:</h2>
      <form>
      <input type="file" onChange={handleChange} />
      <img className='file-image' src={imgFile} />
      <textarea placeholder='notes'></textarea>
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
      <button className='add-btn'>Add Item</button>
      </form>

      
    </div>
  )
}

export default ItemForm