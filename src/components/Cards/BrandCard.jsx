import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { btnStyle } from '../../styles/globalStyle';

const BrandCard = ({_id, name, address, phone, image, handleOpen, setInitialState}) => {
  return (
    <Card
        sx={{
        height: 390,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "0.5rem",
      }}
    >
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography> 
      </CardContent>
      <CardMedia
        sx={{ height: 140, objectFit:"contain"}}
        image={image}
        title={name}
        component="img"
      />      
      <CardActions sx={{ justifyContent: "center", gap: 2 }}>
        <EditIcon sx={btnStyle} onClick={()=> {handleOpen(), setInitialState({_id, name, address, phone, image}) }}/>
        <DeleteOutlineIcon sx={btnStyle}/>
      </CardActions>
    </Card>
  )
}

export default BrandCard