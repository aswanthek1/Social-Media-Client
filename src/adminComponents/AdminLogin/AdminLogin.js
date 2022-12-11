import {
  Avatar,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup.string().email("Invalid Format").required("Field is required"),
  password: yup
    .string()
    .required("Field is reqluired")
    .min(6, "Password is too short - should be 8 chars minimum.")
    .max(16, "Maximum 12 charachters are permitted"),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      try {
        axios
          .post(`${process.env.REACT_APP_BACKEND_URL}/admin/login`, values)
          .then((response) => {
            console.log("response of admin login", response);
            if (response.data.message === "email is incorrect") {
              toast.error("Invalid Email");
            } else if (response.data.message === "password incorrect") {
              toast.error("Password incorrect");
            } else if (response.data.message === "Invalid credentials") {
              toast.error("Invalid credentials");
            } else {
              localStorage.setItem("adminToken", response.data.token);
              navigate("/admin/dash");
            }
          });
      } catch (error) {
        console.log("error", error);
      }
    },
    validationSchema,
  });
  return (
    <>
      <Container maxWidth="xs">
        {/* <Grid container  > */}

        <Grid sx={{ position: "relative" }}>
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              height: 300,
              marginInline: "auto",
              marginTop: "26%",
            }}
          >
            <Grid
              align="center"
              sx={{ position: "absolute", top: 10, left: "41%" }}
            >
              <Avatar
                sx={{
                  backgroundColor: "green",
                }}
              >
                <LockOutlinedIcon />
              </Avatar>
              <h2>Admin</h2>
            </Grid>

            <form
              action=""
              onSubmit={formik.handleSubmit}
              style={{ marginTop: "57px" }}
            >
              <div className="form-control">
                <TextField
                  label="Email"
                  fullWidth
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  variant="standard"
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.email}
                  </FormHelperText>
                ) : null}
              </div>
              <FormControl
                variant="standard"
                fullWidth
                sx={{ marginTop: "6%" }}
              >
                <InputLabel htmlFor="standard-adornment-password">
                  Password
                </InputLabel>
                <Input
                  name="password"
                  placeholder="Enter your password"
                  type={values.showPassword ? "text" : "password"}
                  fullWidth
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {values.showPassword ? (
                          <Visibility />
                        ) : (
                          <VisibilityOff />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </FormControl>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ marginTop: "47px" }}
              >
                Login
              </Button>
            </form>
          </Paper>
        </Grid>
        {/* </Grid> */}
      </Container>
      <Toaster />
    </>
  );
};

export default AdminLogin;
