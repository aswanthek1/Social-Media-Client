import {
  Box,
  Button,
  CircularProgress,
  FormHelperText,
  Modal,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import * as yup from "yup";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 280,
  bgcolor: "background.paper",
  borderRadius: "6px",
  boxShadow: 24,
  p: 4,
};

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const validationSchema = yup.object({
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

const ForgotPassword = ({ open, setOpen }) => {
  const [email, setEmail] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [passwordFields, setPasswordFields] = useState(false);
  const [emailField, setEmailField] = useState(true);
  const [otpField, setOtpField] = useState(false);
  const [otpError, setOtpError] = useState(false);
  const [progress, setProgress] = useState(false);
  const [forgotOtp, setForgotOtp] = useState("");
  const [responseOtp, setResponseOtp] = useState("");
  const handleClose = () => setOpen(false);

  const submitEmail = (event) => {
    event.preventDefault();
    setInvalidEmail(false);
    setProgress(true);
    if (
      /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/.test(email)
    ) {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/email/forgotPassword`, {
          email: email,
        })
        .then((response) => {
          console.log("response of forgot otp", response);
          if (response.data.message === "User exists") {
            // setPasswordFields(true);
            toast.success("An otp sent to your mail");
            setOtpField(true);
            setEmailField(false);
            setResponseOtp(response.data.otpResponse.otp);
            setProgress(false);
          } else {
            setInvalidEmail(true);
          }
        });
    } else {
      setInvalidEmail(true);
    }
  };

  const checkOtp = (event) => {
    event.preventDefault();
    console.log("forgot otp", forgotOtp, "  ", responseOtp);
    setOtpError(false);
    if (forgotOtp === responseOtp) {
      setPasswordFields(true);
      setOtpField(false);
    } else {
      console.log("invalid otp");
      setOtpError(true);
    }
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmpassword: "",
    },
    onSubmit: (values) => {
      try {
        axios
          .patch(
            `${process.env.REACT_APP_BACKEND_URL}/password/forgotPassword`,
            { values, email: email }
          )
          .then((response) => {
            if (response.data.message === "updated") {
              setOpen(false);
              toast.success("Successfully updated your password");
            }
          });
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema,
  });

  return (
    <div>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {emailField ? (
            <form action="" onSubmit={submitEmail}>
              <TextField
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                size="small"
                type="email"
                label="Enter your registered email"
                placeholder="Enter your registered email"
                fullWidth
              />
              {invalidEmail ? (
                <FormHelperText>Invalid Email Address</FormHelperText>
              ) : null}
              {emailField ? (
                <Button
                  type="submit"
                  variant="contained"
                  size="small"
                  disabled={progress ? true : false}
                  sx={{ marginTop: "20px", marginLeft: "38%" }}
                >
                  Proceed
                </Button>
              ) : null}
              {/* <CircularProgress sx={{position:'absolute'}}/> */}
            </form>
          ) : null}

          {otpField ? (
            <form action="" onSubmit={checkOtp}>
              <TextField
                size="small"
                value={forgotOtp}
                onChange={(event) => {
                  setForgotOtp(event.target.value);
                }}
                label="Enter the OTP sent to your mail"
                placeholder="Enter the OTP sent to your mail"
                fullWidth
              />
              {otpError ? (
                <FormHelperText>Entered OTP is wrong</FormHelperText>
              ) : null}
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ marginTop: "20px", marginLeft: "38%" }}
              >
                Next
              </Button>
            </form>
          ) : null}

          <form action="" onSubmit={formik.handleSubmit}>
            {passwordFields ? (
              <TextField
                value={formik.values.password}
                onChange={formik.handleChange}
                size="small"
                name="password"
                type="password"
                label="Enter your new password"
                placeholder="Enter your new password"
                fullWidth
                sx={{ marginTop: "20px" }}
              />
            ) : null}
            {formik.touched.password && formik.errors.password ? (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.password}
              </FormHelperText>
            ) : null}

            {passwordFields ? (
              <TextField
                value={formik.values.confirmpassword}
                onChange={formik.handleChange}
                size="small"
                type="password"
                name="confirmpassword"
                label="Confirm password"
                placeholder="Confirm password"
                fullWidth
                sx={{ marginTop: "15px" }}
              />
            ) : null}
            {formik.touched.confirmpassword && formik.errors.confirmpassword ? (
              <FormHelperText sx={{ color: "red" }}>
                {formik.errors.confirmpassword}
              </FormHelperText>
            ) : null}
            {passwordFields ? (
              <Button
                type="submit"
                variant="contained"
                size="small"
                sx={{ marginTop: "20px", marginLeft: "38%" }}
              >
                Submit
              </Button>
            ) : null}
          </form>
        </Box>
      </StyledModal>
      <Toaster />
    </div>
  );
};

export default ForgotPassword;
