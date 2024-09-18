import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

const FirmModal = ({open, handleClose, initialState}) => {

    const [info, setInfo] = useState(initialState)

    const handleChange = (e) => {
        console.log(e.target.value);
        setInfo({...info, [e.target.name]: e.target.value})
    }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box component="form">
          <TextField 
            id="name" 
            name="name" 
            label="Firm Name" 
            type="text"
            variant="outlined"
            value={info.name}
            onChange={handleChange}
            required
          />
          <TextField 
            id="address" 
            name="address" 
            label="Firm Address" 
            type="text"
            variant="outlined"
            value={info.address}
            onChange={handleChange}
            required
          />
          <TextField 
            id="phone" 
            name="phone" 
            label="Firm Phone" 
            type="text"
            variant="outlined"
            value={info.phone}
            onChange={handleChange}
            required
          />
          <TextField 
            id="image" 
            name="image" 
            label="Firm Logo" 
            type="url"
            variant="outlined"
            value={info.image}
            onChange={handleChange}
            required
          />
          <Button variant="contained" type="submit">"Add New Firm"</Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FirmModal;
