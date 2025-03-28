import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import { Breadcrum } from '../Components/Breadcrum/Breadcrum';
import { ProductView } from '../Components/ProductView/ProductView';
import { Discription } from '../Components/Discription/Discription';

export const Product = () => {
  const { allItems, images } = useContext(ShopContext);
  const { productId } = useParams();
  // console.log(allItems)
  const product = allItems.find((e) => e.id === productId);
  return (
    <div>
      <Breadcrum product={product} image={images[product.image]} />
      <ProductView product={product} image={images[product.image]}/>
      <Discription />

    </div>
  )
}
export default Product
