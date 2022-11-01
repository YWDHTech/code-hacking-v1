import DashboardLayoutStyles from "../DashboardLayout/DashboardLayoutStyles";
import {
  Avatar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import logo from "../../assets/images/logo.png";
import { Contacts, Dashboard } from "@mui/icons-material";
import { Link, useLocation } from "react-router-dom";

type Props = {
  drawerWidth: number;
  open: boolean;
  handleDrawerToggle: () => void;
};

export default function SideBar({
  drawerWidth,
  handleDrawerToggle,
  open,
}: Props) {
  const { classes } = DashboardLayoutStyles({ drawerWidth });
  const { pathname } = useLocation();

  const menuList = [
    { label: "Dashboard", Icon: Dashboard, link: "/app/dashboard" },
    { label: "My Contacts", Icon: Contacts, link: "/app/contacts" },
  ];

  const header = (
    <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
      <Avatar src={logo} alt="phonebook logo" />
      <Typography className={classes.title} variant={"h5"}>
        PhoneBook
      </Typography>
    </Stack>
  );

  const menuItems = menuList.map(({ Icon, link, label }, index) => (
    <ListItem
      key={index}
      disablePadding
      disableGutters
      sx={{
        mb: 2,
        borderLeftWidth: "4px",
        borderLeftStyle: "solid",
        borderLeftColor: link === pathname ? "common.white" : "transparent",
      }}
    >
      <ListItemButton selected={link === pathname} component={Link} to={link}>
        <ListItemIcon>
          <Icon
            sx={{
              color: link === pathname ? "common.white" : "secondary.dark",
            }}
          />
        </ListItemIcon>
        <ListItemText
          sx={{ color: link === pathname ? "common.white" : "secondary.dark" }}
          primary={label}
        />
      </ListItemButton>
    </ListItem>
  ));

  return (
    <Box
      component="nav"
      className={classes.drawerRoot}
      aria-label="mailbox folders"
    >
      <Drawer
        container={window.document.body}
        variant="temporary"
        open={open}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        className={classes.drawerMobile}
      >
        <br />
        {header}
        <br />
        <List dense>{menuItems}</List>
      </Drawer>
      <Drawer variant="permanent" className={classes.drawer} open>
        <br />
        {header}
        <br />
        <List dense>{menuItems}</List>
      </Drawer>
    </Box>
  );
}
