import {
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { useState } from "react";

const validationSchema = yup.object({
  newpassword: yup
    .string()
    .required("Field is reqluired")
    .min(6, "Password is too short - should be 8 chars minimum.")
    .max(16, "Maximum 12 charachters are permitted"),
});


const EditPassword = () => {
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
      oldpassword: "",
      newpassword: "",
      confirmpassword: "",
    },
    onSubmit: (values) => {
      console.log("values form edit password", values);
    },
    validationSchema,
  });
  return (
    <>
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
            <form action="" onSubmit={formik.handleSubmit}>
              <div className="form-control">
                <TextField
                  label="Current Password"
                  fullWidth
                  type={values.showPassword ? "text" : "password"}
                  name="oldpassword"
                  placeholder="Enter current password"
                  variant="outlined"
                  onBlur={formik.handleBlur}
                  value={formik.values.oldpassword}
                  onChange={formik.handleChange}
                  inputProps={
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
                {formik.touched.newpassword && formik.errors.password ? (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </div>
              <div className="form-control" style={{ marginTop: "6%" }}>
                <TextField
                  label="New Password"
                  fullWidth
                  type="password"
                  name="newpassword"
                  placeholder="Enter New password"
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.newpassword}
                />
                {formik.touched.newpassword && formik.errors.password ? (
                  <FormHelperText sx={{ color: "red" }}>
                    {formik.errors.password}
                  </FormHelperText>
                ) : null}
              </div>
              <FormControl
                variant="outlined"
                fullWidth
                sx={{ marginTop: "6%" }}
              >
                <TextField
                  name="confirmpassword"
                  type="password"
                  placeholder="Confirm Password"
                  fullWidth
                  variant="outlined"
                  onChange={formik.handleChange}
                  value={formik.values.confirmpassword}
                />
              </FormControl>
              {formik.touched.newpassword && formik.errors.password ? (
                <FormHelperText sx={{ color: "red" }}>
                  {formik.errors.password}
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
          </Paper>
        </Grid>
      </Container>
    </>
  );
};

export default EditPassword;
