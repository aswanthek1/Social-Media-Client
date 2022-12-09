import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
// import 'react-toastify/dist/ReactToastify.css';
import { Container, Paper, Grid, Typography } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import AddCircleOutlineOutlinedIcon from "@material-ui/icons/AddCircleOutlineOutlined";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
// import { useMediaQuery, useTheme } from '@material-ui/core'
import * as yup from "yup";
import FormHelperText from "@material-ui/core/FormHelperText";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import OutlinedInput from "@mui/material/OutlinedInput";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import jwt_decode from "jwt-decode";

import useStyles from "./UserSignupStyle.js";
import { CircularProgress } from "@mui/material";

const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  password: "",
  confirmpassword: "",
  otp: "",
  // dateofbirth: ''
};

const validationSchema = yup.object({
  firstname: yup
    .string()
    .required("This field is required")
    .min(3, "First name must need minimum 3 charachters")
    .max(12, "Maximum 12 charachters are permitted")
    .matches(/^[A-Za-z]+(\s*[A-Za-z]+)*$/, "Only alphabets are allowed"),

  lastname: yup
    .string()
    .required("This field is required")
    .min(1, "Last name must need minimum 1 charachter")
    .max(12, "Maximum 12 charachters are permitted")
    .matches(/^[A-Za-z]+(\s*[A-Za-z]+)*$/, "Only alphabets are allowed"),

  email: yup
    .string()
    .email("Invalid Format")
    .required("This field is required"),

  phonenumber: yup
    .string()
    .matches(/^[0-9\- ]{10}$/, "enter valid number")
    .required("This field is required"),

  password: yup
    .string()
    .required("Field is required")
    .min(6, "Minimum 6 charachters are needed")
    .max(16, "Maximum 16 charachters are permitted"),

  confirmpassword: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password"), null], "Password must be same as above"),
});

function UserSignup() {
  const navigate = useNavigate();
  const [otpField, setOtpField] = useState(false);
  const [OTP, setOTP] = useState("");
  const [OTPError, setOtpError] = useState(false);
  const [proceedProgress,setProceedProgress] = useState(false)
  const [values, setValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const [confirmPasswordValues, setConfirmPasswordValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordValues({
      ...confirmPasswordValues,
      showConfirmPassword: !confirmPasswordValues.showConfirmPassword,
    });
  };

  // const theme = useTheme()
  // const showTextfield = useMediaQuery(theme.breakpoints.up('sm'))
  // const showTextfieldSM = useMediaQuery(theme.breakpoints.up('md'))

  const resentOTP = (value) => {
    setProceedProgress(true)

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/otp/resent`, { email: value })
      .then((response) => {
        setOTP(response.data.otp);
        setProceedProgress(false)
        toast.success('An otp sent to your email')

      });
  };

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      try {
        
        if (OTP == "") {
          setProceedProgress(true)
          axios
            .post(`${process.env.REACT_APP_BACKEND_URL}/register`, values)
            .then((e) => {
              if (
                e.data.message === "This email already exists, try another one"
              ) {
                toast.error("You already have an account", {
                  icon: "⚠️",
                  duration: 2000,
                  style: {
                    width: "300px",
                    backgroundColor: "greenyellow",
                    fontSize: "20px",
                  },
                });
              } else if (e.data.message === "otp sent") {
                toast.success('An otp sent to your email')
                setOtpField(true);
                setProceedProgress(false)
                setOTP(e.data.otp);
              }
            })
            .catch((error) => {
              console.log("erereor", error);
            });
        } else {
          if (OTP === values.otp) {
            axios
              .post(`${process.env.REACT_APP_BACKEND_URL}/register/otp`, values)
              .then((response) => {
                if (response.data) {
                  localStorage.setItem("userToken", response.data.token);
                  navigate("/");
                }
              });
          } else {
            setOtpError(true);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema,
  });

  function handleCallbackResponse(response) {
    const userObj = jwt_decode(response.credential);
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/googleRegister`, userObj)
      .then((e) => {
        if (e.data.message === "user already exists") {
          toast.error("You already have an account", {
            icon: "⚠️",
            duration: 2000,
            style: {
              width: "300px",
              backgroundColor: "greenyellow",
              fontSize: "20px",
            },
          });
        } else {
          localStorage.setItem("userToken", e.data.token);
          navigate("/");
        }
      });
  }

  useEffect(() => {
    /*global google*/
    google.accounts.id.initialize({
      client_id:
        "649675884780-h9g6gsh5nov2kpq7joqsau7fnchl8mbq.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("googlebtn"), {
      theme: "outline",
      size: "medium",
    });

    // google.accounts.id.prompt()
  }, []);

  const classes = useStyles();

  return (
    <>
      <Container maxWidth="xs">
        <Grid item className={classes.mainGrid}>
          <IconButton
            className={classes.arrowBack}
            onClick={() => navigate("/login")}
          >
            <ArrowBackIosIcon />
          </IconButton>
          <Grid item align="center">
            <Paper elevation={21} className={classes.firstPaper}>
              <Grid item className={classes.avatarGrid}>
                <Avatar className={classes.avatar}>
                  <AddCircleOutlineOutlinedIcon />
                </Avatar>
                <h1 className={classes.signupTitle}>Sign Up</h1>
                <Typography variant="caption">
                  <b>Please fill this form to register your account !</b>
                </Typography>
              </Grid>

              <form action="" onSubmit={formik.handleSubmit}>
                <Grid container spacing={0} justifyContent="space-between">
                  <Grid item xs={12} sm={5}>
                    <TextField
                      name="firstname"
                      size="small"
                      fullWidth
                      type="text"
                      id="firstname"
                      variant="outlined"
                      label="First Name"
                      className={classes.firstnamefield}
                      onChange={formik.handleChange}
                      value={formik.values.firstname}
                      placeholder="Enter your First name"
                    />
                    {formik.touched.firstname && formik.errors.firstname ? (
                      <FormHelperText className={classes.errors}>
                        {formik.errors.firstname}
                      </FormHelperText>
                    ) : null}
                  </Grid>

                  <Grid item xs={12} sm={5}>
                    <TextField
                      name="lastname"
                      size="small"
                      fullWidth
                      type="text"
                      id="lastname"
                      variant="outlined"
                      label="Last Name"
                      placeholder="Enter your last name"
                      onChange={formik.handleChange}
                      value={formik.values.lastname}
                      className={classes.textfieldlastname}
                    />
                    {formik.touched.lastname && formik.errors.lastname ? (
                      <FormHelperText className={classes.errors}>
                        {formik.errors.lastname}
                      </FormHelperText>
                    ) : null}
                  </Grid>
                </Grid>

                <TextField
                  name="email"
                  size="small"
                  type="email"
                  id="email"
                  variant="outlined"
                  label="Email"
                  fullWidth
                  placeholder="Enter your email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  className={classes.textfield}
                />
                {formik.touched.email && formik.errors.email ? (
                  <FormHelperText className={classes.errors}>
                    {formik.errors.email}
                  </FormHelperText>
                ) : null}

                <TextField
                  name="phonenumber"
                  size="small"
                  type="text"
                  id="phonenumber"
                  variant="outlined"
                  label="Mobile"
                  fullWidth
                  placeholder="Enter your mobile number"
                  onChange={formik.handleChange}
                  value={formik.values.phonenumber}
                  className={classes.textfield}
                />
                {formik.touched.phonenumber && formik.errors.phonenumber ? (
                  <FormHelperText className={classes.errors}>
                    {formik.errors.phonenumber}
                  </FormHelperText>
                ) : null}

                <OutlinedInput
                  id="outlined-adornment-password"
                  fullWidth
                  label="Password"
                  placeholder="Enter your Password"
                  name="password"
                  className={classes.textfield}
                  size="small"
                  type={values.showPassword ? "text" : "password"}
                  value={formik.values.password}
                  onChange={formik.handleChange("password")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.password && formik.errors.password ? (
                  <FormHelperText className={classes.errors}>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}

                <OutlinedInput
                  id=" password"
                  fullWidth
                  size="small"
                  label="Password"
                  placeholder="Confirm password"
                  name="confirmpassword"
                  className={classes.textfield}
                  type={
                    confirmPasswordValues.showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  value={formik.values.confirmpassword}
                  onChange={formik.handleChange("confirmpassword")}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowConfirmPassword}
                        edge="end"
                      >
                        {confirmPasswordValues.showConfirmPassword ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {formik.touched.confirmpassword &&
                formik.errors.confirmpassword ? (
                  <FormHelperText className={classes.errors}>
                    {formik.errors.confirmpassword}
                  </FormHelperText>
                ) : null}

                {otpField === false ? (
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    disabled={proceedProgress?true:false}
                  >
                    Proceed
                  </Button>
                ) : null}

{ proceedProgress ?  <CircularProgress
                sx={{position:'absolute',color:'green',size:'10px',left:'46%',bottom:'18%'}}
                />: null}
                {/* </form> */}

                {/* <form action=""> */}
                {otpField ? (
                  <TextField
                    name="otp"
                    size="small"
                    // value={OTPcheck}
                    // onChange={(event) => {setOTPCheck(event.target.value)}}
                    value={formik.values.otp}
                    onChange={formik.handleChange}
                    type="text"
                    id="otp"
                    variant="outlined"
                    label="Enter otp sent to your mail"
                    fullWidth
                    placeholder="OTP"
                    className={classes.textfield}
                  />
                ) : null}
                {OTPError ? (
                  <FormHelperText className={classes.errors}>
                    You enterd a wrong OTP
                  </FormHelperText>
                ) : null}
                {otpField ? (
                  <span style={{color:'#1893c5', position:'absolute', right:'33px', top:'74%'}}
                    onClick={() => {
                      resentOTP(formik.values.email);
                    }}
                  >
                    Resent otp
                  </span>
                ) : null}

                {otpField ? (
                  <Button
                    variant="contained"
                    type="submit"
                    // onClick={verifyOTP}
                    color="primary"
                    className={classes.submit}
                  >
                    Submit
                  </Button>
                ) : null}

                <Typography align="center" className={classes.or}>
                  {" "}
                  <b>Or</b>{" "}
                </Typography>
                <div id="googlebtn" className={classes.google}></div>
              </form>
              <Toaster />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default UserSignup;
