import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrum/Breadcrum';
import { ProductView } from '../Components/ProductView/ProductView';
import {Discription} from '../Components/Discription/Discription';

export const Product = () => {
  const{all_product}= useContext(ShopContext);
  const{productId} =useParams();
  const product = all_product.find((e)=> e.id=== Number(productId));
  return (
    <div>
      <Breadcrum product={product}/>
      <ProductView product={product}/>
      <Discription/>
      
    </div>
  )
}
export default Product
