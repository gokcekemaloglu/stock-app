import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const FirmCard = ({_id, name, address, phone, image}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography gutterBottom variant="body2">
          Address: {address}
        </Typography>
        
      </CardContent>
      <CardMedia
        sx={{ height: 140, objectFit:"contain"}}
        image={image}
        title={name}
        component="img"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Phone: {phone}
        </Typography>
        
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default FirmCard;
