import { Box, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from '@mui/material'
import React from 'react'
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

const MenuListItems = () => {

    const navigate = useNavigate()

  return (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {links.map((link, index) => (
          <ListItem key={link.title} disablePadding>
            <ListItemButton onClick={()=>navigate(link.url)}>
              <Box sx={{
                width: "24px",
                height: "24px",
                mr: 2,
                mask: `url(${link.icon}) no-repeat center / contain`,
                bgcolor: "red"
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