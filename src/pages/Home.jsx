import { Container, Typography } from '@mui/material'
import React from 'react'
import KpiCards from '../components/KpiCards'
import Charts from '../components/Charts'

const Home = () => {

  

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