import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Paper,
} from "@mui/material";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { refreshReducer } from "../../Redux/RefreshSlice";

const validationSchema = yup.object({
  newpassword: yup
    .string()
    .min(6, "Password is too short - should be 8 chars minimum.")
    .max(16, "Maximum 12 charachters are permitted"),

  confirmpassword: yup
    .string()
    .oneOf([yup.ref("newpassword"), null], "Password must be same as above"),
});

const EditPassword = () => {
  const dispatch = useDispatch();
  const [oldPasswordError, setOldPasswordError] = useState(false);
  const [oldpassword, setOldPassword] = useState("");
  const [newPasswordFields, setNewPasswordFields] = useState(false);
  const user = useSelector((state) => state.user);
  const userId = user._id;
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

  const [newPasswordValues, setNewPassword] = useState({
    password: "",
    showPassword: false,
  });
  const [confirmPasswordValues, setConfirmPasswordValues] = React.useState({
    password: "",
    showPassword: false,
  });

  const handleClickShowNewPassword = () => {
    setNewPassword({
      ...newPasswordValues,
      newpassword: !newPasswordValues.newpassword,
    });
  };

  const handleClickShowConfirmPassword = () => {
    setConfirmPasswordValues({
      ...confirmPasswordValues,
      showConfirmPassword: !confirmPasswordValues.showConfirmPassword,
    });
  };

  const getOldPassword = (event) => {
    event.preventDefault();
    try {
      if (oldpassword.trim() === "") {
        setOldPasswordError(true);
      } else if (oldpassword.length < 6 || oldpassword.length > 16) {
        setOldPasswordError(true);
      } else {
        setOldPasswordError(false);
        axios
          .patch(`${process.env.REACT_APP_BACKEND_URL}/oldPassword/${userId}`, {
            oldPassword: oldpassword,
          })
          .then((response) => {
            console.log("checked response", response);
            if (response.data.message === "correct password") {
              setNewPasswordFields(true);
            } else if (response.data.message === "incorrect password") {
              setNewPasswordFields(false);
              toast.error("Password entered is not correct");
            }
          });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formik = useFormik({
    initialValues: {
      newpassword: "",
      confirmpassword: "",
    },
    onSubmit: (values, { resetForm }) => {
      try {
        console.log("fsubmit", values);
        if (
          values.confirmpassword.trim() === "" ||
          values.newpassword.trim() === ""
        ) {
          console.log("enter it man");
        } else {
          axios
            .patch(
              `${process.env.REACT_APP_BACKEND_URL}/password/editPassword/${userId}`,
              { newPassword: values.newpassword, oldPassword: oldpassword }
            )
            .then((response) => {
              console.log("response of edited password", response);
              if (response.data.message === "Successfully edited password") {
                toast.success("Password Edited Successfully");
                resetForm({ values: "" });
              } else {
                toast.error("Some thing went wrong");
                console.log("Some thing went wrong");
              }
            });
        }
      } catch (error) {
        console.log(error);
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <Toaster />
      <Container maxWidth="sm">
        <Grid sx={{ position: "relative" }}>
          <Paper
            elevation={6}
            sx={{
              padding: 4,
              height: 380,
              marginInline: "auto",
              marginTop: "50px",
            }}
          >
            <div className="form-control">
              <OutlinedInput
                fullWidth
                type={values.showPassword ? "text" : "password"}
                name="oldpassword"
                placeholder="Enter current password"
                variant="outlined"
                value={oldpassword}
                onChange={(event) => setOldPassword(event.target.value)}
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
              {oldPasswordError ? (
                <FormHelperText sx={{ color: "red" }}>
                  Enter your current password
                </FormHelperText>
              ) : null}
              {newPasswordFields === false ? (
                <Button
                  variant="contained"
                  onClick={getOldPassword}
                  size='small'
                  sx={{ marginLeft: "40%", marginTop: "20px" }}
                >
                  {" "}
                  Proceed{" "}
                </Button>
              ) : null}
            </div>

            {newPasswordFields ? (
              <form action="" onSubmit={formik.handleSubmit}>
                <div className="form-control" style={{ marginTop: "6%" }}>
                  <OutlinedInput
                    fullWidth
                    type={newPasswordValues.newpassword ? "text" : "password"}
                    name="newpassword"
                    placeholder="Enter New password"
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.newpassword}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowNewPassword}
                          edge="end"
                        >
                          {newPasswordValues.newpassword ? (
                            <VisibilityOffIcon />
                          ) : (
                            <VisibilityIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  {formik.touched.newpassword && formik.errors.newpassword ? (
                    <FormHelperText sx={{ color: "red" }}>
                      {formik.errors.newpassword}
                    </FormHelperText>
                  ) : null}
                </div>
                <FormControl
                  variant="outlined"
                  fullWidth
                  sx={{ marginTop: "6%" }}
                >
                  <OutlinedInput
                    name="confirmpassword"
                    type={
                      confirmPasswordValues.showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm Password"
                    fullWidth
                    variant="outlined"
                    onChange={formik.handleChange}
                    value={formik.values.confirmpassword}
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
                </FormControl>
                {formik.touched.confirmpassword &&
                formik.errors.confirmpassword ? (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.confirmpassword}
                  </FormHelperText>
                ) : null}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ marginTop: "67px" }}
                >
                  Submit
                </Button>
              </form>
            ) : null}
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default EditPassword;
