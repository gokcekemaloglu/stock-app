import { Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import React from "react";
import { useState } from "react";
import useStockCall from "../../hooks/useStockCall";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import { useSelector } from "react-redux";

const ProductModal = ({open, handleClose, initialState}) => {
  const [info, setInfo] = useState(initialState);

  const { postStockData, putStockData } = useStockCall();
  const {categories, brands} = useSelector(state=>state.stock)

  const handleChange = (e) => {
    console.log(e.target.value);
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info._id) {
      putStockData("products", info);
      console.log(info);
    } else {
      postStockData("products", info);
    }
    handleClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box component="form" sx={flexColumn} onSubmit={handleSubmit}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-category-label">Category</InputLabel>
            <Select
              labelId="demo-simple-category-label"
              id="demo-category-select"
              value={info.categoryId}
              name="categoryId"
              label="Category"
              onChange={handleChange}
            >
                {categories.map((category)=><MenuItem key={category._id} value={category._id}>{category.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-brand-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-brand-label"
              id="demo-brand-select"
              value={info.brandId}
              name="brandId"
              label="Brand"
              onChange={handleChange}
            >
                {brands.map((brand)=><MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            id="name"
            name="name"
            label="Product Name"
            type="text"
            variant="outlined"
            value={info.name}
            onChange={handleChange}
            required
          />

          <Button variant="contained" type="submit">
            {info._id ? "Update Product" : "Add New Product"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ProductModal;
