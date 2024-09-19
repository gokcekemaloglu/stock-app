import React from 'react'
import { useEffect } from 'react'
import useStockCall from '../hooks/useStockCall'
import { Button, Container, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import BrandCard from '../components/Cards/BrandCard'
import BrandModal from '../components/Modals/BrandModal'


const Brands = () => {

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setInitialState({
      name: "",
      address: "",
      phone: "",
      image: "",
    })
  } 
  
  const [initialState, setInitialState] = useState({
    name: "",
    image: "",
  })

  const {getStockData} = useStockCall()

  const {brands} = useSelector(state => state.stock)
  console.log(brands);

  console.log(initialState);
  
  

  useEffect(()=>{
    getStockData("brands")
  },[])


  return (
    <Container>
      <Typography
        align="center"
        color="secondary.second"
        variant="h4"
        component="h1"
      >
        Brands
      </Typography>
      <Button variant="contained" onClick={handleOpen}>New Brand</Button>
      {open && <BrandModal open={open} handleClose={handleClose} initialState={initialState}/>}
      <Grid container spacing={2} mt={2}>
        {brands.map((brand)=>(
          <Grid item xs={12} md={6} lg={4} xl={3} key={brand._id} >
            <BrandCard {...brand} handleOpen={handleOpen} setInitialState={setInitialState}/>
          </Grid>
        ))}
      </Grid>

    </Container>
  )
}

export default Brands