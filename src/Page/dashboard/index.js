import * as React from "react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import SendIcon from "@mui/icons-material/Send";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useTheme } from "@mui/material";

// import { Transfer, Recharge, Statement, Cashback, Profile } from "../index";
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
    icon: <MenuBookIcon />,
    option: "statement",
  },
  {
    title: "Cashbacks",
    icon: <CardGiftcardIcon />,
    option: "cashback",
  },
];

export default function Dashboard() {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState("recharge");
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    //  <Box sx={{ display: "flex" }}>
    //    <CssBaseline />
    //    <AppBar position="fixed" open={open}></AppBar>
    //  </Box>
    <Box sx={{ flexGrow: 1 }}>
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
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        {/* <Divider /> */}
        <List>
          {attributes.map((item) => {
            return (
              // <ListItem
              //   key={item.title}
              //   disablePadding
              //   sx={{ display: "block" }}
              //   onClick={() => setSelectedOption(item?.option)}
              // >
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
                    {item?.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              // </ListItem>
            );
          })}
        </List>
        <Divider />
      </Drawer>
    </Box>
  );
}
