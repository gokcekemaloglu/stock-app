import { Button, Container, Grid, Typography } from '@mui/material'
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import useStockCall from '../hooks/useStockCall';
import { useSelector } from 'react-redux';
import ProductModal from '../components/Modals/ProductModal';

const Products = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({
      name: "",
      categoryId: "",
      brandId: "",      
    })
  } 
  
  const [initialState, setInitialState] = useState({
    name: "",
    categoryId: "",
    brandId: "", 
  })

  const {getStockData} = useStockCall()

  useEffect(()=>{
    getStockData("products")
    getStockData("categories")
    getStockData("brands")
  },[])

  const {products} = useSelector(state=> state.stock)

  console.log(products);
  

  return (
    <Container>
      <Typography
        align="center"
        color="secondary.second"
        variant="h4"
        component="h1"
      >
        Products
      </Typography>
      <Button variant="contained" onClick={handleOpen}>New Product</Button>
      {open && <ProductModal open={open} handleClose={handleClose} initialState={initialState}/>}
      <Grid>
        something good
      </Grid>
    </Container>
  )
}

export default Products