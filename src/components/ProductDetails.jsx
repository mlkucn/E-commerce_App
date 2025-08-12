import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { setSelectedProduct } from '../redux/slices/productSlice';
import '../css/ProductDetails.css'
import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { addToBasket, calculateBasket } from '../redux/slices/basketSlice';



function ProductDetails() {
  const {id} = useParams();
  const {products, selectedProduct} = useSelector((store) => store.product)

  const {price, image, title, description} = selectedProduct;

  const [count, setCount] = useState(0);

  const dispatch = useDispatch();

  const increment = () => {
    setCount(count + 1)
  }

  const decrement = () => {
    setCount(count - 1)
  }

  const addBasket = () => {
    const payload = {
      id,
      price,
      image,
      title,
      description,
      count
    }
    dispatch(addToBasket(payload));
    dispatch(calculateBasket());
  }
 
  useEffect(() => {
    getProductById();
  },[])

  const getProductById = () => {
    products && products.map((product) =>{
      if(product.id == id){
        dispatch(setSelectedProduct(product));

      }
    })
  }

  return (

    <div className='p-details'>
      <div >
        <img className='img'  src={image}  alt="" />
      </div> 

        <div className='description'>
          <h1>{title}</h1>
          <p>{description}</p>
          <h3>{price}₺</h3>

          <div className='icons'>
            <FaCirclePlus className='icon-right' onClick={increment}  /> <span style={{fontSize: '30px'}}> {count}</span> 
            <FaCircleMinus className='icon-left' onClick={decrement}  />
          </div>

          <div>
            <button className='btn' onClick={addBasket} >Sepete Ekle</button>
          </div>

        </div>
    </div>
  )
}

export default ProductDetails