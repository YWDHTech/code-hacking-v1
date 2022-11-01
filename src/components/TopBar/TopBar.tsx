import DashboardLayoutStyles from "../DashboardLayout/DashboardLayoutStyles";
import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Search } from "@mui/icons-material";
import { MouseEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { removeUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

type Props = {
  drawerWidth: number;
  handleDrawerToggle: () => void;
};

export default function TopBar({ drawerWidth, handleDrawerToggle }: Props) {
  const { classes } = DashboardLayoutStyles({ drawerWidth });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const dispatch = useAppDispatch;
  const navigate = useNavigate();
  const { user } = useAppSelector((store) => store.user);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      className={classes.appBar}
      elevation={0}
      color={"secondary"}
    >
      <Toolbar className={classes.toolbar}>
        <Stack direction={"row"} alignItems={"center"}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Box className={classes.search}>
            <Box className={classes.searchIconWrapper}>
              <Search color={"action"} />
            </Box>
            <TextField
              variant={"outlined"}
              className={classes.styledInputBase}
              placeholder={"Search"}
            />
          </Box>
        </Stack>
        <Stack direction={"row"} alignItems={"center"}>
          <ListItem disableGutters dense onClick={handleClick}>
            <ListItemButton dense disableRipple disableTouchRipple>
              <ListItemAvatar>
                <Avatar src={user.avatar} alt="user-avatar" />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItemButton>
          </ListItem>
        </Stack>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem className={classes.menuItem} onClick={handleClose}>
            <Typography sx={{ minWidth: "100px" }} variant={"body2"}>
              Profile
            </Typography>
          </MenuItem>
          <MenuItem
            onClick={() => {
              dispatch(removeUser());
              handleClose();
              navigate("/auth/login");
            }}
            className={classes.menuItem}
          >
            <Typography sx={{ minWidth: "100px" }} variant={"body2"}>
              Logout
            </Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
}
