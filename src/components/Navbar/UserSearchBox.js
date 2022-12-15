import {
  Box,
  IconButton,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchUsersList from "../SearchUsersList/SearchUsersList";
import CloseIcon from "@mui/icons-material/Close";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const UserSearchBox = ({ searchBox, setSearchBox }) => {
  const user = useSelector((state) => state.user);
  const [searchUser, setSearchUser] = useState([]);
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
    <>
      <StyledModal open={searchBox} onClose={() => setSearchBox(false)}>
        <Box
          width={400}
          maxHeight={680}
          height={600}
          bgcolor="white"
          p={6}
          borderRadius={5}
          position="relative"
        >
          <IconButton
            onClick={() => setSearchBox(false)}
            sx={{ position: "absolute", right: "5px", top: "2px" }}
          >
            <CloseIcon />
          </IconButton>
          <Typography
            id="basic-modal-dialog-title"
            component="h2"
            level="inherit"
            fontSize="1.25em"
            mb="0.25em"
            align="center"
          >
            Search users
          </Typography>

          <TextField
            type="text"
            name="users"
            id=""
            placeholder="Search people"
            fullWidth
            onChange={formik.handleChange}
            value={formik.values.users}
            variant="standard"
            sx={{ marginTop: "20px" }}
          />

          <SearchUsersList
            searchUser={searchUser}
            setSearchUser={setSearchUser}
          />
        </Box>
      </StyledModal>
    </>
  );
};

export default UserSearchBox;
