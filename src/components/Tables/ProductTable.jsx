import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import useStockCall from "../../hooks/useStockCall";
import { btnStyle } from "../../styles/globalStyle";

function getRowId(row) {
  return row._id;
}

const ProductTable = () => {
  const { products } = useSelector((state) => state.stock);
  const { deleteStockData } = useStockCall();

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      minWidth: 40,
      maxWidth: 250,
      headerAlign: "center",
      align: "center",
      flex: 0.8,
    },
    {
      field: "categoryId",
      headerName: "Category",
      headerAlign: "center",
      align: "center",
      minWidth: 150,
      editable: false,
      flex: 2,
      valueGetter: (value) => value?.name ?? "-No Category-",
    },
    {
      field: "brandId",
      headerName: "Brand",
      minWidth: 90,
      flex: 2,
      headerAlign: "center",
      align: "center",
      valueGetter: (value) => value?.name ?? "-No Brand-",
    },
    {
      field: "name",
      headerName: "Name",
      minWidth: 150,
      flex: 2,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "quantity",
      headerName: "Stock",
      type: "number",
      minWidth: 90,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      editable: true,
    },
    {
      field: "actions",
      headerName: "Actions",
      sortable: false,
      headerAlign: "center",
      align: "center",
      minWidth: 40,
      flex: 1,
      renderCell: (params) => (
        <DeleteOutlineIcon
          onClick={() => deleteStockData("products", params.id)}
          sx={btnStyle}
        />
      ),
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "1rem" }}>
      <DataGrid
        autoHeight
        rows={products}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        getRowId={getRowId}
        pageSizeOptions={[5, 10, 15, 20]}
        // checkboxSelection
        disableRowSelectionOnClick
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </Box>
  );
};

export default ProductTable;
