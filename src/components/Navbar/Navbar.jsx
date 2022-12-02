import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  Grid,
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
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../../Redux/UserSlice";
import { refreshReducer } from "../../Redux/RefreshSlice";
import { Drawer } from "@mui/material";
import DrawerSidebar from "./DrawerSidebar";
import { PersonSearchRounded } from "@mui/icons-material";

const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const Icons = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  marginRight: "20px",
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "none",
  gap: "20px",
  alignItems: "center",
  marginRight: "20px",
  [theme.breakpoints.down("sm")]: {
    display: "flex",
  },
}));

function Navbar() {
  const dispatch = useDispatch();
  const [showSearch, setShowSearch] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const refresh = useSelector((state) => state.refresh.refresh);
  const formik = useFormik({
    initialValues: {
      users: null,
    },
  });
  const [state, setState] = React.useState({
    left: false,
    right: false
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
      sx={{ width: 180, height: "100vh" }}
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
    console.log(formik.values.users);
    axios
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/userSearch/${formik.values.users}`
      )
      .then((e) => {
        setSearchUser(e.data);
      });
  }, [formik.values.users]);

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
          <div onClick={toggleDrawer("left", true)}>
            <InterestsIcon
              sx={{ display: { xs: "block", md: "none" }, color: "grey" }}
            />
          </div>

          <Icons>
            <IconButton onClick={() => navigate("/chat")}>
              <Badge badgeContent={4} color="error">
                <MailIcon sx={{ color: "grey" }} />
              </Badge>
            </IconButton>
            <Badge badgeContent={4} color="error">
              <NotificationsIcon sx={{ color: "grey" }} />
            </Badge>
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
        <Box
          onClick={toggleDrawer("right", true)}
          style={{ position: "absolute", right: "2px",top:'15px' }}
        >
          <PersonSearchRounded sx={{ color: "grey", fontSize: "30px",display:{lg:'none'} }} />
        </Box>
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
              src="/static/images/avatar/1.jpg"
              sx={{ width: 30, height: 30, marginRight: "10px" }}
            />{" "}
            <b> {user.firstname}</b>
          </MenuItem>
          <MenuItem
            onClick={() => {
              navigate(`/profile/${user._id}` );
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
          <MenuItem>My account</MenuItem>
          <MenuItem onClick={() => (navigate("/login"), localStorage.clear())}>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>

      <div>
        {["left", "right"].map((anchor) => (
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
