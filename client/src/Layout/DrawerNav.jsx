import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  styled,
} from "@mui/material";
import PropTypes from "prop-types";
import CloseIcon from "@mui/icons-material/Close";
import routes from "../routes/routes";
import { NavLink } from "react-router-dom";
const DrawerNav = ({ open, handleDrawer }) => {
  const drawerWidth = 240;

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
        },
      }}
      variant='persistent'
      anchor='right'
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawer}>
          <CloseIcon />
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List>
        {routes().map((item) => (
          <NavLink
            key={item.id}
            className='link-offset-2 link-underline link-underline-opacity-0'
            to={item.path}
          >
            <ListItem disablePadding>
              <ListItemButton>
                {/* <ListItemText primary={item.name} /> */}
                <ListItemText>{item.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default DrawerNav;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

DrawerNav.propTypes = {
  open: PropTypes.bool.isRequired,
  handleDrawer: PropTypes.func.isRequired,
};
