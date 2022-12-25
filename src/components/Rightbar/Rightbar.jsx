import Box from "@mui/material/Box";
import React, { useState, useEffect } from "react";
import {  InputBase } from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import SearchUsersList from "../SearchUsersList/SearchUsersList";
function Rightbar() {
  const [searchUser, setSearchUser] = useState([]);
  const user = useSelector((state) => state.user);
  const formik = useFormik({
    initialValues: {
      users: null,
    },
  });

  useEffect(() => {
    console.log(formik.values.users);
    if (formik.values.users === "") {
      console.log("type some thing");
    } else {
      axios
        .get(
          `${process.env.REACT_APP_BACKEND_URL}/userSearch/${formik.values.users}`,
          { headers: { user: user._id } }
        )
        .then((e) => {
          setSearchUser(e.data);
        });
    }
  }, [formik.values.users]);

  return (
    <Box flex={3} p={1} sx={{ display: { xs: "none", lg: "block" } }}>
      <Box position="fixed" width="31%" height="100vh" bgcolor="#EAF6F6">
        {/* <Typography align='center' variant='h5' fontWeight={100} mt={1} mb={2} color='green' > <b>Search People</b> </Typography> */}
        {/* <Divider variant="middle" sx={{ borderBottomWidth: 3 }} /> */}

        <Box
          sx={{
            width: "80%",
            marginTop: "26px",
            marginLeft: "9%",
            height: "30px",
            borderRadius: "15px",
            padding: "0 10px",
            display: "flex",
            justifyContent: "center",
            border: "2px solid",
          }}
        >
          <InputBase
            fullWidth
            variant="standard"
            size="small"
            name="users"
            placeholder="Search People"
            onChange={formik.handleChange}
            value={formik.values.users}
            // onClick={() => setShowSearch(true)}
            // endAdornment={
            //   <InputAdornment position="end">
            //    <CircularProgress/>
            //   </InputAdornment>
            // }
          />
        </Box> 
        <SearchUsersList
          searchUser={searchUser}
          setSearchUser={setSearchUser}
        />
      </Box>
    </Box>
  );
}

export default Rightbar;
