import { Box, Button, Modal, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import useStockCall from "../../hooks/useStockCall";

const BrandModal = ({open, handleClose, initialState}) => {

    const [info, setInfo] = useState(initialState)

    const {postStockData, putStockData} = useStockCall()

    const handleChange = (e) => {
        console.log(e.target.value);
        setInfo({...info, [e.target.name]: e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (info._id) {
            putStockData("brands", info)
            console.log(info);            
        } else {
            postStockData("brands", info)
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
            label="Brand Name" 
            type="text"
            variant="outlined"
            value={info.name}
            onChange={handleChange}
            required
          />
          <TextField 
            id="image" 
            name="image" 
            label="Brand Logo" 
            type="url"
            variant="outlined"
            value={info.image}
            onChange={handleChange}
            required
          />
          <Button variant="contained" type="submit">
            {info._id ? "Update Brand" : "Add New Brand"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default BrandModal