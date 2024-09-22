import { Box } from "@mui/material";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import React from "react";
import { useSelector } from "react-redux";
import useStockCall from "../../hooks/useStockCall";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from "@mui/icons-material/Edit";
import { btnStyle } from "../../styles/globalStyle";

function getRowId(row) {
  return row._id;
}

const PurchaseTable = ({ setInitialState, handleOpen }) => {
  const { purchases } = useSelector((state) => state.stock);
  const { deleteStockData } = useStockCall();

  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      minWidth: 150,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return new Date(row.createdAt).toLocaleString("de-DE");
      },
    },
    {
      field: "firmId",
      headerName: "Firm",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return row?.firmId?.name ?? "-No Firm-";
      },
    },
    {
      field: "brandId",
      headerName: "Brand",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return row?.brandId?.name ?? "-No Brand-";
      },
    },
    {
      field: "productID",
      headerName: "Product",
      flex: 1,
      minWidth: 100,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row }) => {
        return row?.productId?.name ?? "-No Product-";
      },
    },
    {
      field: "quantity",
      headerName: "Quantity",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "amount",
      headerName: "Amount",
      minWidth: 50,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      renderCell: ({
        row: { brandId, productId, quantity, price, firmId, _id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setInitialState({
                _id,
                brandId,
                productId,
                quantity,
                price,
                firmId,
              });
            }}
            sx={btnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteOutlineIcon />}
            label="Delete"
            onClick={() => deleteStockData("purchases", _id)}
            sx={btnStyle}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ height: 400, width: "100%", marginTop: "1rem" }}>
      <DataGrid
        autoHeight
        rows={purchases}
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

export default PurchaseTable;
