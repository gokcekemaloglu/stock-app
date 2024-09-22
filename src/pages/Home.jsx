import { Container, Typography } from '@mui/material'
import React from 'react'
import KpiCards from '../components/KpiCards'
import Charts from '../components/Charts'
import useStockCall from '../hooks/useStockCall'
import { useEffect } from 'react'

const Home = () => {

  const {getPurSales} = useStockCall()

  useEffect(()=>{
    getPurSales()
  },[])

  return (
    <Container>
      <Typography
        align="center"
        color="secondary.second"
        variant="h4"
        component="h1"
      >
        Dashboard
      </Typography>
      <KpiCards/>
      <Charts/>
    </Container>
  )
}

export default Home