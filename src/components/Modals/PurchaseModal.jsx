import { Box, Button, Divider, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from "@mui/material";
import { flexColumn, modalStyle } from "../../styles/globalStyle";
import { useState } from "react";
import useStockCall from "../../hooks/useStockCall";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PurchaseModal = ({open, handleClose, initialState}) => {

  const navigate = useNavigate()

  const [info, setInfo] = useState(initialState);

  const { postStockData, putStockData } = useStockCall();
  const {purchases, brands, firms, products} = useSelector(state=>state.stock)

  const handleChange = (e) => {
    console.log(e.target.value);
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (info._id) {
      putStockData("purchases", info);
      console.log(info);
    } else {
      postStockData("purchases", info);
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
            <InputLabel id="demo-simple-firm-label">Firm</InputLabel>
            <Select
              labelId="demo-simple-firm-label"
              id="demo-firm-select"
              value={info?.firmId?._id || info?.firmId || ""}
              name="firmId"
              label="firm"
              onChange={handleChange}
            >
              <MenuItem onClick={()=> navigate("/stock/firms")}>Add New Firm</MenuItem>
              <Divider/>
              {firms.map((firm)=><MenuItem key={firm._id} value={firm._id}>{firm.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-brand-label">Brand</InputLabel>
            <Select
              labelId="demo-simple-brand-label"
              id="demo-brand-select"
              value={info?.brandId?._id || info?.brandId || ""}
              name="brandId"
              label="Brand"
              onChange={handleChange}
            >
              <MenuItem onClick={()=> navigate("/stock/brands")}>Add New Brand</MenuItem>
              <Divider/>
              {brands.map((brand)=><MenuItem key={brand._id} value={brand._id}>{brand.name}</MenuItem>)}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-product-label">Product</InputLabel>
            <Select
              labelId="demo-simple-product-label"
              id="demo-product-select"
              value={info?.productId?._id || info?.productId || ""}
              name="productId"
              label="product"
              onChange={handleChange}
            >
              <MenuItem onClick={()=> navigate("/stock/products")}>Add New Product</MenuItem>
              <Divider/>
              {products.map((product)=><MenuItem key={product._id} value={product._id}>{product.name}</MenuItem>)}
            </Select>
          </FormControl>
          <TextField
            id="quantity"
            name="quantity"
            label="Quantity"
            type="number"
            variant="outlined"
            value={info.quantity}
            onChange={handleChange}
            required
          />
          <TextField
            id="price"
            name="price"
            label="Price"
            type="number"
            variant="outlined"
            value={info.price}
            onChange={handleChange}
            required
          />

          <Button variant="contained" type="submit">
            {info._id ? "Update Purchase" : "Add New Purchase"}
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default PurchaseModal