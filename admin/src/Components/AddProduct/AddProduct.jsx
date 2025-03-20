import React, { useState } from 'react';
import './AddProduct.css';
import upload from '../../assets/image-upload.png';

const AddProduct = () => {
  const [image, setImage] = useState(null);
  const [productData, setProductData] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  });

  
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); 
    }
  };
  const changeHandler = (e) =>{
    setProductData({...productData,[e.target.name]:e.target.value})

  }
  const Add_Product = async ()=>{
    console.log(productData);
    let responseData;
    let product = productData;

    let formData = new FormData();
    formData.append('product',image);
    await fetch('http://localhost:4000/upload',{
        method:'POST',
        headers:{
            Accept:'application/json',
        },
        body:formData,
    }).then((resp)=> resp.json()).then((data)=>{responseData=data})
    
    if(responseData.success){
        product.image = responseData.image_url;
        console.log(product);
    }

    
  }

  return (
    <div className='addproduct'>
      <div className='addproduct-itemfield'>
        <p>Product Title</p>
        <input value={productData.name} onChange={changeHandler} type="text" name='name' placeholder='Type here' />
      </div>

      <div className='addproduct-price'>
        <div className='addproduct-itemfield'>
          <p>Product Price</p>
          <input value={productData.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='Type here' required />
          </div>
          <div className='addproduct-itemfield'>
            <p>Offer Price</p>
            <input value={productData.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='Type here' required />
          </div>
        </div>

        <div className='addproduct-itemfield'>
          <p>Product Category</p>
          <select name='category' value={productData.category} onChange={changeHandler} className='selector' required>
            <option value="women">Women</option>
            <option value="men">Gents</option>
            <option value="denim">Denim Collection</option>
          </select>
        </div>


      {/* Image Upload Section */}
      <div className="addproduct-itemfield">
        <p>Upload Product Image</p>
        <label htmlFor='file-input'>
          <img src={image || upload} className='addproduct-img' alt="Preview" />
        </label>
        <input type="file" name='image' id='file-input' hidden onChange={handleImageChange} />
      </div>

      <button onClick={()=>{Add_Product()}} className='add-product'>Save Product</button>
      
    </div>
  );
};

export default AddProduct;