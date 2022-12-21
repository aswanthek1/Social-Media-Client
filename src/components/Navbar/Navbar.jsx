import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import InterestsIcon from "@mui/icons-material/Interests";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../Redux/UserSlice";
import { Drawer } from "@mui/material";
import DrawerSidebar from "./DrawerSidebar";
import { PersonSearchRounded } from "@mui/icons-material";
import UserSearchBox from "./UserSearchBox";
import { refreshReducer } from "../../Redux/RefreshSlice";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "12px",
  alignItems: "center",
  // marginRight: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "14px",
  alignItems: "center",
  // marginRight: "20px",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const [searchBox, setSearchBox] = useState(false);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: 185, height: "100vh" }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      bgcolor="#F5F5F5"
    >
      <div
        style={{
          backgroundColor: "white",
          marginBottom: 1,
          display: "flex",
          justifyContent: "center",
          height: "40px",
          padding: "10px",
        }}
      >
        <h2
          style={{
            color: "grey",
            fontFamily: "Angkor",
            fontSize: "29px",
            fontWeight: 800,
          }}
        >
          <InterestsIcon sx={{ color: "grey" }} /> <b> Instants</b>
        </h2>
      </div>

      <DrawerSidebar state={state} />
    </Box>
  );

  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}`, {
        headers: { token: userToken },
      })
      .then((response) => {
        if (response.data.message === "userNotFound") {
          return null;
        } else {
          dispatch(update(response.data));
          // dispatch(refreshReducer());
        }
      });
  }, []);

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user);
  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: "white" }}>
        <StyledToolBar>
          <Typography
            variant="h6"
            sx={{
              display: { xs: "none", md: "block" },
              color: "grey",
              fontFamily: "Angkor",
              fontSize: "29px",
              fontWeight: 800,
            }}
          >
            Instants
          </Typography>
          <Box sx={{ display: { xs: "block", md: "none", }}} onClick={toggleDrawer("left", true)}>
            <InterestsIcon
              sx={{ display: { xs: "block", md: "none" }, color: "grey" }}
            />
          </Box>
          <Box sx={{ display: { xs: "block", lg: "none" } }}>
            {searchBox ? (
              <UserSearchBox
                searchBox={searchBox}
                setSearchBox={setSearchBox}
              />
            ) : null}
          </Box>

          <IconButton
            sx={{
              display: { xs: "block", lg: "none" },
              position: "absolute",
              right: { sm: "135px", xs: "47px" },
              top: { sm: "13px", xs: "10px" },
            }}
            onClick={() => {
              setSearchBox(true);
            }}
          >
            <PersonSearchRounded />
          </IconButton>
          <Icons>
            <IconButton onClick={() => navigate("/chat")}>
              {/* <Badge badgeContent={4} color="error"> */}
              <MailIcon sx={{ color: "grey" }} />
              {/* </Badge> */}
            </IconButton>
            {/* <Badge badgeContent={4} color="error"> */}
            <NotificationsIcon sx={{ color: "grey" }} />
            {/* </Badge> */}
            <Avatar
              alt={user.firstname}
              src={user.profileimage}
              sx={{ width: 30, height: 30 }}
              onClick={(e) => setOpen(true)}
            />
          </Icons>
          <UserBox>
            <Avatar
              alt={user.firstname}
              src={user.profileimage}
              sx={{ width: 30, height: 30 }}
              onClick={(e) => setOpen(true)}
            />
          </UserBox>
        </StyledToolBar>

        <Menu
          id="demo-positioned-menu"
          aria-labelledby="demo-positioned-button"
          open={open}
          onClose={(e) => setOpen(false)}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem sx={{ marginBottom: "10px" }}>
            {" "}
            <Avatar
              alt={user.firstname}
              src={user.profileimage}
              sx={{ width: 30, height: 30, marginRight: "10px" }}
            />{" "}
            <b> {user.firstname}</b>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(`/profile/${user._id}`);
              localStorage.setItem("profileUser", user._id);
              dispatch(refreshReducer())
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            sx={{ display: { xs: "block", sm: "none" } }}
            onClick={() => navigate("/chat")}
          >
            Messages
          </MenuItem>
          <MenuItem sx={{ display: { xs: "block", sm: "none" } }}>
            Notifications
          </MenuItem>
          <MenuItem onClick={() => (navigate("/login"), localStorage.clear())}>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>

      <div>
        {["left"].map((anchor) => (
          <React.Fragment key={anchor}>
            <Drawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
            >
              {list(anchor)}
            </Drawer>
          </React.Fragment>
        ))}
      </div>
    </>
  );
}

export default Navbar;
