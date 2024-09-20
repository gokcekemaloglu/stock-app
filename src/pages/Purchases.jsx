import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import useStockCall from '../hooks/useStockCall';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PurchaseModal from '../components/Modals/PurchaseModal';
import PurchaseTable from '../components/Tables/PurchaseTable';

const Purchases = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({
      firmId: "",
      brandId: "",
      productId: "",
      quantity: "",
      price: "",
    });
  };

  const [initialState, setInitialState] = useState({
    firmId: "",
      brandId: "",
      productId: "",
      quantity: "",
      price: "",
  });

  const { getStockData, getFirmBrandProPur } = useStockCall();

  useEffect(() => {    
    getFirmBrandProPur();
  }, []);

  const { purchases, loading, error } = useSelector((state) => state.stock);

  console.log(purchases);

  return (
    <Container>
      <Typography
        align="center"
        color="secondary.second"
        variant="h4"
        component="h1"
      >
        Purchases
      </Typography>
      <Button variant="contained" onClick={handleOpen}>
        New Purchase
      </Button>
      {open && <PurchaseModal open={open} handleClose={handleClose} initialState={initialState}/>}
      <PurchaseTable setInitialState={setInitialState} handleOpen={handleOpen}/>
    </Container>
  )
}

export default Purchases