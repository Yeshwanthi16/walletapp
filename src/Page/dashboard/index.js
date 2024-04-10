import * as React from "react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SendIcon from "@mui/icons-material/Send";
import ViewListIcon from "@mui/icons-material/ViewList";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useTheme } from "@mui/material";

import { Recharge, Transfer, Statement, Cashback, Profile } from "../index";
import { AppBar, Drawer, DrawerHeader } from "./styles";
import { REACT_APP_API } from "../../constants";

const attributes = [
  {
    title: "Recharge",
    icon: <CurrencyRupeeIcon />,
    option: "recharge",
  },
  {
    title: "Transfer",
    icon: <SendIcon />,
    option: "transfer",
  },
  {
    title: "Statement",
    icon: <ViewListIcon />,
    option: "statement",
  },
  {
    title: "Cashbacks",
    icon: <CardGiftcardIcon />,
    option: "cashback",
  },
  {
    title: "Profile",
    icon: <AccountCircleIcon />,
    option: "account",
  },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  // const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState("recharge");
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    // const token = localStorage?.getItem("token").replace(/"/g, "");
    const tokenn = localStorage.getItem("token");
    if (tokenn) {
      // setUser(token);
      const token = tokenn.replace(/"/g, "");
      setUser(token);

      axios
        .post(`${REACT_APP_API}/data`, {
          token: token,
        })
        .then((response) => {
          setUser(response.data);
          dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        })
        .catch((error) => {
          console.log(error);
          navigate("/login");
        });
    } else {
      navigate("/login");
    }
  }, []);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
    dispatch({ type: "LOGIN_FAILURE", payload: null });
  };

  if (!user) {
    return <div>Loading...</div>;
  }
  return (
    //  <Box sx={{ display: "flex" }}>
    //    <CssBaseline />
    //    <AppBar position="fixed" open={open}></AppBar>
    //  </Box>
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            onClick={handleDrawerOpen}
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WalletApp
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <Typography
            variant="h6"
            component="div"
            sx={{ color: "green", position: "sticky" }}
          >
            Menu
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {/* {theme.direction === "rtl" ? ( */}
            {/* <ChevronRightIcon /> */}
            {/* ) : ( */}
            <ChevronLeftIcon />
            {/* )} */}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {attributes.map((item) => {
            return (
              <ListItem
                key={item.title}
                disablePadding
                sx={{ display: "block" }}
                onClick={() => setSelectedOption(item?.option)}
              >
                <ListItemButton
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : "auto",
                      justifyContent: "center",
                    }}
                  >
                    {item?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <List>
          <ListItem
            disablePadding
            sx={{ display: "block" }}
            onClick={handleLogout}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ opacity: open ? 1 : 0 }} />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {selectedOption === "recharge" && <Recharge />}
        {selectedOption === "transfer" && <Transfer />}
        {selectedOption === "statement" && <Statement />}
        {selectedOption === "cashback" && <Cashback />}
        {selectedOption === "account" && <Profile />}
      </Box>
    </Box>
  );
}
