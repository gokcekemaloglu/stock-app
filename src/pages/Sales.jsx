import React from 'react'
import { useEffect } from 'react'
import useStockCall from '../hooks/useStockCall'
import { useSelector } from 'react-redux'
import { Button, Container, Typography } from '@mui/material'
import { useState } from 'react'
import SalesModal from '../components/Modals/SalesModal'
import SalesTable from '../components/Tables/SalesTable'


const Sales = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({
      brandId: "",
      productId: "",
      quantity: "",
      price: "",
    });
  };

  const [initialState, setInitialState] = useState({
    brandId: "",
    productId: "",
    quantity: "",
    price: "",
  });

  const {getSalesBrandPro} = useStockCall()
  
  useEffect(()=>{
    getSalesBrandPro()
  },[])

  const {sales, loading, error} = useSelector(state => state.stock)
  console.log(sales);

  return (
    <Container>
      <Typography
        align="center"
        color="secondary.second"
        variant="h4"
        component="h1"
      >
        Sales
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Sale
      </Button>
      {open && <SalesModal open={open} handleClose={handleClose} initialState={initialState}/>}
      <SalesTable setInitialState={setInitialState} handleOpen={handleOpen}/>
    </Container>
  )
}

export default Sales