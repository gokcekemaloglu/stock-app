import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const icon = (name) => `/assets/navbar/${name}.svg`

const links = [
    {
        title: "Dashboard",
        url: "/stock",
        icon: icon("ic_analytics")
    },
    {
        title: "Firms",
        url: "/stock/firms",
        icon: icon("firms")
    },
    {
        title: "Brands",
        url: "/stock/brands",
        icon: icon("brand")
    },
    {
        title: "Purchases",
        url: "/stock/purchases",
        icon: icon("purchase")
    },
    {
        title: "Sales",
        url: "/stock/sales",
        icon: icon("sales")
    },
    {
        title: "Products",
        url: "/stock/products",
        icon: icon("ic_cart")
    },

]

const btnStyle = {
  color: "secondary.main", 
  borderRadius: "1rem",
  "&:hover": {
    backgroundColor: "secondary.main",
    color: "white"
  }
}

const selectedStyle = {
  backgroundColor: "secondary.second", 
  color: "white",
  borderRadius: "1rem",
  "&:hover": {
    backgroundColor: "secondary.main",
    color: "white"
  }
}

const MenuListItems = () => {

    const navigate = useNavigate()
    const location = useLocation()
    // console.log(location);

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {links.map((link, index) => (
          <ListItem key={link.title} disablePadding>
            <ListItemButton onClick={()=>navigate(link.url)} sx={link.url === location.pathname ? selectedStyle : btnStyle}>
              <Box sx={{
                width: "24px",
                height: "24px",
                mr: 2,
                mask: `url(${link.icon}) no-repeat center / contain`,
                bgcolor: "currentColor"
              }}>

              </Box>
              <ListItemText primary={link.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default MenuListItems