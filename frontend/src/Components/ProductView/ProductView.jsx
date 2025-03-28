import React, { useContext } from 'react'
import './ProductView.css'
import star_icon from "../Assets/star_icon.png"
import star_dull_icon from "../Assets/star_dull_icon.png"
import { ShopContext } from '../../Context/ShopContext'
export const ProductView = (props) => {
    const {product, image} =props;
    const {addToCart} = useContext(ShopContext);

  return (
    <div className='productView'>
        <div className="productView-left">
            <div className="productView-img-list">
                <img src={image} alt=""/>
                <img src={image} alt=""/>
                <img src={image} alt=""/>
                <img src={image} alt=""/>
            </div>
            <div className="productView-img">
                <img className='productView-main-img' src={image} alt=""/>
            </div>
        </div>
        <div className="productView-right">
            <h1>{product.name}</h1>
            <div className="productView-right-star">
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_icon} alt="" />
                <img src={star_dull_icon} alt="" />
                <p>(122)</p>
            </div>
            <div className="productView-right-prices">
                <div className="product-right-price-old">${product.old_price}</div>
                <div className="productView-right-price-new">${product.new_price}</div>

            </div>
            <div className="productView-rigth-desc">
                A soft material, comfy shirt and wear rich
            </div>

            <div className="productView-right-size">
                <h1>Select Size</h1>
                <div className="product-right-size">
                    <div>UK8</div>
                    <div>UK10</div>
                    <div>UK12</div>
                    <div>UK14</div>
                    <div>UK16</div>
                </div>
            </div>
            <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
            <p className='productView-right-category'><span>Category:</span>Women, T-shirts Crop top</p>
            <p className='productView-right-category'><span>Tags:</span>Modern, Latest</p>


            <div>

            </div>

        </div>
        
    </div>
    
  )
}
