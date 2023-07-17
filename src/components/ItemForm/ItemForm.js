import React, { useState, useEffect } from 'react';
import './ItemForm.css';
import { v4 as uuid} from 'uuid';
import { postClosetData } from '../../apiCalls';

const ItemForm = () => {
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState({error:false, message: ""});
  const [addSuccess, setAddSuccess] = useState(false);
  const [newData, setNewData] = useState(null);

  const handleChange = (e) => {
    setAddSuccess(false);
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
    console.log('file state', URL.createObjectURL(e.target.files[0]))
}

  const handleSelect = (e) => {
    setAddSuccess(false);
    setCategory(e.target.value);
  }

  const handleNotes = (e) => {
    setAddSuccess(false);
    setNotes(e.target.value);
  }
  const clearForm = () => {
    setImage("")
    setNotes("")
    setCategory("")
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if(image && category) {
      setNewData({
        id: uuid(),
        image: image,
        category: category,
        notes: notes
      });
      clearForm();
    } else {
      setError({error: true, message:`Please select both an image and category!`});
    }
  }
    
    useEffect(() => {
      console.log(newData)
    }, [newData])

    useEffect(() => {
      if(newData) {
      postClosetData(newData)
      .then(() => {
        setError({error: false, message: ""});
        setAddSuccess(true);
      })
      .catch(err => {
        if(err.message.includes('Failed')) {
          setError({error: true, message: `Connection error, please try again later!`})
        } else {
          setError({error: true, message: err.message})}
        })
      
        console.log('post sent')
      }
    },[newData])

  return ( 
    <div className='item-form'>
      <h1 className='add-item-header'>Add Item To Closet:</h1>
      <form>
        <label htmlFor='fileUpload' className='upload-img-btn'>Upload Image
          <input id='fileUpload' className='file-upload-default' type="file" onChange={handleChange} />
        </label>
        <img className='file-image' src={image} />
        <select
          className='select-input'
          value={category}
          onChange={(e) => { handleSelect(e) }}
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
        <textarea className='notes-input' value={notes} onChange={handleNotes} placeholder='notes'></textarea>
        <button className='add-btn' onClick={handleSubmit}>Add Item</button>
      </form>
      {error.error && <p>{error.message}</p>}
      {addSuccess && <p>Item successfully added!</p>}
      
    </div>
  )
}

export default ItemForm