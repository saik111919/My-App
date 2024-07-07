import { Outlet } from "react-router-dom";
import "@/assets/Css/NavBar.css";
import {
  AppBar,
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DrawerNav from "./DrawerNav";

const NavBar = () => {
  const [open, setOpen] = useState(false);
  const handleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <CssBaseline />
        <AppBar position='static' color='inherit'>
          <Toolbar variant='dense'>
            <Typography
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}
              component='div'
            >
              Nano
            </Typography>
            <IconButton
              edge='end'
              color='inherit'
              aria-label='menu'
              onClick={handleDrawer}
              sx={{ ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DrawerNav open={open} setOpen={setOpen} handleDrawer={handleDrawer} />
      </Box>
      <main className='page-body shadow-inner p-2'>
        <Outlet />
      </main>
    </>
  );
};

export default NavBar;
