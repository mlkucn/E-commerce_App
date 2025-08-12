import { useEffect, useState } from 'react'
import './App.css'
import PageContainer from './container/PageContainer'
import Header from './components/Header'
import RouterConfig from './config/RouterConfig'
import Loading from './components/Loading'
import Drawer from '@mui/material/Drawer';
import { useDispatch, useSelector } from 'react-redux'
import { calculateBasket, setDrawer } from './redux/slices/basketSlice'



function App() {
  
  const {products,drawer,totalAmount} = useSelector((store) => store.basket);

  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(calculateBasket());
  },[])

  return (
    <div>
      <PageContainer>
       
        <Header/>
        <RouterConfig/>
        <Loading/>
        <Drawer  sx={{padding:'20px'}} anchor='right' onClose={() => dispatch (setDrawer())} open={drawer}>
          {
            products && products.map((product) => {
              return (
              <div key={product.id}>
                <div className='flex-row' style={{padding:'20px'}}>
                  <img style={{marginRight:'5px'}} src={product.image} width={50} height={50} />
                  <p  style={{width:'320px', marginRight:'5px', }}>{product.title}({product.count})</p>
                  <p style={{fontWeight:'bold', width:'60px', marginRight:'60px'}}>{product.price}₺</p>
                  <button className='silButon' >Sil</button>

                </div>

              </div>  
              )
            })
          }
            <div>
                <p>Toplam Tutar: {totalAmount}</p>
            </div>

        </Drawer>
        
      </PageContainer>
      
    </div>
  )
}

export default App
