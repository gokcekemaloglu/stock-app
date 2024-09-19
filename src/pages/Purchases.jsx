import { Button, Container, Typography } from '@mui/material'
import React from 'react'
import { useState } from 'react';
import useStockCall from '../hooks/useStockCall';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import PurchaseModal from '../components/Modals/PurchaseModal';

const Purchases = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({
      name: "",
      categoryId: "",
      brandId: "",
    });
  };

  const [initialState, setInitialState] = useState({
    name: "",
    categoryId: "",
    brandId: "",
  });

  const { getStockData, getFirmBrandPro } = useStockCall();

  useEffect(() => {    
    getFirmBrandPro();
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
      <PurchaseModal open={open} handleClose={handleClose} initialState={initialState}/>
    </Container>
  )
}

export default Purchases