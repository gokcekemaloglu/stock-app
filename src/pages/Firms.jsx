import React from 'react'
import { useEffect } from 'react'
import useStockCall from '../hooks/useStockCall'
import { Button, Container, Grid, Typography } from '@mui/material'
import { useState } from 'react'
import FirmModal from '../components/Modals/FirmModal'
import { useSelector } from 'react-redux'
import FirmCard from '../components/Cards/FirmCard'

const Firms = () => {


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
    address: "",
    phone: "",
    image: "",
  })

  const {getStockData} = useStockCall()

  const {firms} = useSelector(state => state.stock)
  console.log(firms);
  

  useEffect(()=>{
    // console.log('useEffect')
    getStockData("firms")
  },[])

  return (
    <Container>
      <Typography
        align="center"
        color="secondary.second"
        variant="h4"
        component="h1"
      >
        Firms
      </Typography>
      <Button variant="contained" onClick={handleOpen}>New Firm</Button>
      {open && <FirmModal open={open} handleClose={handleClose} initialState={initialState}/>}
      <Grid container spacing={2} mt={2}>
        {firms.map((firm)=>(
          <Grid item xs={12} md={6} lg={4} xl={3} key={firm._id} >
            <FirmCard {...firm}/>
          </Grid>
        ))}
      </Grid>

    </Container>
  )
}

export default Firms