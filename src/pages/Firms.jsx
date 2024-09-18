import React from 'react'
import { useEffect } from 'react'
import useStockCall from '../hooks/useStockCall'
import { Button, Container, Typography } from '@mui/material'

const Firms = () => {

  const {getStockData} = useStockCall()

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
      <Button variant="contained">New Firm</Button>
    </Container>
  )
}

export default Firms