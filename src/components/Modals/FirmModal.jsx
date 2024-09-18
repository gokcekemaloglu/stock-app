import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import useStockCall from "../../hooks/useStockCall";

const FirmModal = ({open, handleClose, initialState}) => {

    const [info, setInfo] = useState(initialState)

    const {postStockData, putStockData} = useStockCall()

    const handleChange = (e) => {
        console.log(e.target.value);
        setInfo({...info, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (info._id) {
            putStockData("firms", info)
            console.log(info);
            
        } else {
            postStockData("firms", info)
        }
        handleClose()
    }

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box component="form" sx={flexColumn} onSubmit={handleSubmit}>
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
          <Button variant="contained" type="submit">
            {info._id ? "Update Firm" : "Add New Firm"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FirmModal;
