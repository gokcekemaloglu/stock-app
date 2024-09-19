import { Button, Container, Typography } from '@mui/material'
import React from 'react'

const Purchases = () => {
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
      <Button variant="contained">
        New Purchase
      </Button>
    </Container>
  )
}

export default Purchases