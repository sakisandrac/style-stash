import React, { useState, useEffect } from 'react';
import './ItemForm.css';
import { v4 as uuid} from 'uuid';
import { postData } from '../../apiCalls';

const ItemForm = ({user}) => {
  const [image, setImage] = useState("");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState({error:false, message: ""});
  const [addSuccess, setAddSuccess] = useState(false);
  const [newData, setNewData] = useState(null);

  const handleChange = (e) => {
    setAddSuccess(false);
    if(e.target.name === 'fileUpload') {
      setImage(URL.createObjectURL(e.target.files[0]))
    } 

    if(e.target.name === 'url') {
      setImage(e.target.value)
    }
  };

  const handleSelect = (e) => {
    setAddSuccess(false);
    setCategory(e.target.value);
  };

  const handleNotes = (e) => {
    setAddSuccess(false);
    setNotes(e.target.value);
  };

  const clearForm = (setters) => {
    setters.forEach((func) => {
      func("");
    });
  };

  const newFormData = () => {
    return {
      id: `PIE-${uuid()}`,
      image: image,
      categoryID: `CAT-${category.toLowerCase()}`,
      notes: notes,
      userID: user.id
    };
  };

  const checkErrors = (err) => {
    if (err.message.includes('Failed')) {
      setError({ error: true, message: `Connection error, please try again later!` });
    } else {
      setError({ error: true, message: err.message });
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(image && category) {
      setNewData(newFormData());
      clearForm([setImage, setNotes, setCategory]);
    } else {
      setError({error: true, message:`Please select both an image and category!`});
    };
  };

  const postNewItem = async () => {
    try {
      await postData('closet', newData);
      setError({ error: false, message: "" });
      setAddSuccess(true);
    } catch (err) {
      checkErrors(err);
      setAddSuccess(false);
    };
  };

  useEffect(() => {
    if (newData) {
      postNewItem()
    };
    return () => setError({error:false, message: ""});
  }, [newData]);

  return (
    <div className='item-form'>
      <h1 className='page-title'>Add Item To Closet:</h1>
      <form>
        <label htmlFor='fileUpload' className='upload-img-btn'>Upload Image
          <input name='fileUpload' id='fileUpload' className='file-upload-default' type="file" onChange={(e) => handleChange(e)} />
        </label>
        <p>OR</p>
        <input className='url-input' type='text' name='url' onChange={(e) => handleChange(e)} placeholder='Add an image URL'></input>
        {image && <img className='file-image' src={image} />}
        <select
          className='select-input'
          value={category}
          onChange={(e) => { handleSelect(e) }}
          name="category">
          <option>Please Select one:</option>
          <option value='pants'>Pants</option>
          <option value='skirts'>Skirts</option>
          <option value='onepieces'>One-Pieces</option>
          <option value='tops'>Tops</option>
          <option value='outerwear'>Outerwear</option>
          <option value='shoes'>Shoes</option>
          <option value='bags'>Bags</option>
          <option value='accessories'>Accessories</option>
          <option value='miscellaneous'>Miscellaneous</option>
        </select>
        <textarea className='notes' value={notes} onChange={handleNotes} placeholder='notes'></textarea>
        <button className='add-btn' onClick={handleSubmit}>Add Item</button>
      </form>
      {error.error && <p>{error.message}</p>}
      {addSuccess && <p>Item successfully added!</p>}
    </div>
  )
}

export default ItemForm