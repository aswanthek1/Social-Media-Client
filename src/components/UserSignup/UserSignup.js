import React from 'react'
// import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormik } from 'formik'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast';
// import 'react-toastify/dist/ReactToastify.css';
import { Container, Paper, Grid, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
// import { useMediaQuery, useTheme } from '@material-ui/core'
import * as yup from 'yup'
import FormHelperText from '@material-ui/core/FormHelperText';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import useStyles from './UserSignupStyle.js'


const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    phonenumber: '',
    password: '',
    confirmpassword: '',
    // dateofbirth: ''
}

const validationSchema = yup.object({
    firstname: yup.string()
        .required("This field is required")
        .min(3, 'First name must need minimum 3 charachters')
        .max(12, 'Maximum 12 charachters are permitted')
        .matches(/^[A-Za-z]+(\s*[A-Za-z]+)*$/, 'Only alphabets are allowed'),

    lastname: yup.string()
        .required("This field is required")
        .min(1, 'Last name must need minimum 1 charachter')
        .max(12, 'Maximum 12 charachters are permitted')
        .matches(/^[A-Za-z]+(\s*[A-Za-z]+)*$/, 'Only alphabets are allowed'),

    email: yup.string().email('Invalid Format').required('This field is required'),

    phonenumber: yup.string().matches(/^[0-9\- ]{10}$/, "enter valid number")
        .required('This field is required'),

    password: yup.string()
        .required('Field is required')
        .min(6, 'Minimum 6 charachters are needed')
        .max(16, 'Maximum 16 charachters are permitted'),

    confirmpassword: yup.string()
        .required('This field is required')
        .oneOf([yup.ref('password'), null], 'Password must be same as above'),

})








function UserSignup() {

    const navigate = useNavigate()

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false
    })

    const [confirmPasswordValues, setConfirmPasswordValues] = React.useState({
        password: '',
        showPassword: false
    })


    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleClickShowConfirmPassword = () => {
        setConfirmPasswordValues({
            ...confirmPasswordValues,
            showConfirmPassword: !confirmPasswordValues.showConfirmPassword
        })
    }

    // const theme = useTheme()
    // const showTextfield = useMediaQuery(theme.breakpoints.up('sm'))
    // const showTextfieldSM = useMediaQuery(theme.breakpoints.up('md'))

    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            try {
                axios.post('http://localhost:5000/register', values).then((e) => {
                    
                    if (e.data.message) {
                        toast.error("You already have an account", {
                            icon: '⚠️',
                            duration: 2000,
                            style: {
                                width: '300px',
                                backgroundColor: 'greenyellow',
                                fontSize: '20px'
                            }
                        });
                    }
                    else {
                        console.log('response', e.data)
                        localStorage.setItem('userToken',e.data.token)
                        navigate('/')
                    }
                }).catch((error) => {
                    console.log("erereor", error)
                })
            } catch (error) {
                console.log(error)
            }
        },
        validationSchema
    })

    const classes = useStyles()

    return (
        <>

            <Container maxWidth='sm'>
                <Grid item className={classes.mainGrid}>
                    <IconButton className={classes.arrowBack} onClick={() => (
                        navigate('/login')
                    )}>
                        <ArrowBackIosIcon />
                    </IconButton>
                    <Grid item align='center'>
                        <Paper elevation={21} className={classes.firstPaper} >

                            <Grid item className={classes.avatarGrid}>

                                <Avatar className={classes.avatar}><AddCircleOutlineOutlinedIcon /></Avatar>
                                <h1 className={classes.signupTitle}>Sign Up</h1>
                                <Typography variant='caption'><b>Please fill this form to register your account !</b></Typography>
                            </Grid>


                            <form action="" onSubmit={formik.handleSubmit}>

                                {/* <Hidden mdUp implementation="css">
                                     <div>                                    
                                        <TextField                                        
                                            name='firstname'
                                            type='text'
                                            id="firstname"
                                            variant='outlined'
                                            label='First Name'
                                            className={classes.firstnamefield}
                                            onChange={formik.handleChange}
                                            value={formik.values.firstname}
                                            placeholder='Enter your First name'
                                            fullWidth />
                                        {formik.touched.firstname && formik.errors.firstname ? <FormHelperText className={classes.errors}>{formik.errors.firstname}</FormHelperText> : null}





                                        <TextField
                                            name='lastname'
                                            type='text'
                                            id="lastname"
                                            variant='outlined'
                                            label="Second Name"
                                            placeholder='Enter your Second name'
                                            fullWidth
                                            onChange={formik.handleChange}
                                            value={formik.values.lastname}
                                            className={classes.textfield} />
                                        {formik.touched.lastname && formik.errors.lastname ? <FormHelperText className={classes.errors}>{formik.errors.lastname}</FormHelperText> : null}

                                    </div> 
                                </Hidden> */}







                                {/* <Hidden smDown implementation="css"> */}
                                <Grid container spacing={0} justifyContent='space-between'  >


                                    <Grid item xs={12} sm={5}>
                                         
                                       
                                    
                                        <TextField
                                            name='firstname'
                                            fullWidth
                                            type='text'
                                            id="firstname"
                                            variant='outlined'
                                            label='First Name'
                                            className={classes.firstnamefield}
                                            onChange={formik.handleChange}
                                            value={formik.values.firstname}
                                            placeholder='Enter your First name'
                                        />
                                        {formik.touched.firstname && formik.errors.firstname ? <FormHelperText className={classes.errors}>{formik.errors.firstname}</FormHelperText> : null}
                                       
                                       </Grid>
                                       
                                       <Grid item xs={12} sm={5}>
                                       
                                        <TextField
                                            name='lastname'
                                            fullWidth
                                            type='text'
                                            id="lastname"
                                            variant='outlined'
                                            label="Last Name"
                                            placeholder='Enter your last name'
                                            onChange={formik.handleChange}
                                            value={formik.values.lastname}
                                            className={classes.textfieldlastname} />
                                        {formik.touched.lastname && formik.errors.lastname ? <FormHelperText className={classes.errors}>{formik.errors.lastname}</FormHelperText> : null}
                                       
                                    </Grid>
                                </Grid>                             

                                <TextField
                                    name='email'
                                    type='email'
                                    id="email"
                                    variant='outlined'
                                    label="Email"
                                    fullWidth
                                    placeholder='Enter your email'
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className={classes.textfield} />
                                {formik.touched.email && formik.errors.email ? <FormHelperText className={classes.errors}>{formik.errors.email}</FormHelperText> : null}

                                <TextField
                                    name='phonenumber'
                                    type='text'
                                    id="phonenumber"
                                    variant='outlined'
                                    label="Mobile"
                                    fullWidth
                                    placeholder='Enter your mobile number'
                                    onChange={formik.handleChange}
                                    value={formik.values.phonenumber}
                                    className={classes.textfield} />
                                {formik.touched.phonenumber && formik.errors.phonenumber ? <FormHelperText className={classes.errors}>{formik.errors.phonenumber}</FormHelperText> : null}

                                <OutlinedInput
                                    id="outlined-adornment-password"
                                    fullWidth
                                    label="Password"
                                    placeholder='Enter your Password'
                                    name='password'
                                    className={classes.textfield}
                                    type={values.showPassword ? 'text' : 'password'}
                                    value={formik.values.password}
                                    onChange={formik.handleChange('password')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                                {formik.touched.password && formik.errors.password ? <FormHelperText className={classes.errors}>{formik.errors.password}</FormHelperText> : null}

                                <OutlinedInput
                                    id=" password"
                                    fullWidth
                                    label="Password"
                                    placeholder='Confirm password'
                                    name='confirmpassword'
                                    className={classes.textfield}
                                    type={confirmPasswordValues.showConfirmPassword ? 'text' : 'password'}
                                    value={formik.values.confirmpassword}
                                    onChange={formik.handleChange('confirmpassword')}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                            >
                                                {confirmPasswordValues.showConfirmPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    } />
                                {formik.touched.confirmpassword && formik.errors.confirmpassword ? <FormHelperText className={classes.errors}>{formik.errors.confirmpassword}</FormHelperText> : null}

                                <Button type='submit' variant='contained' color='primary' className={classes.submit}>Submit</Button>

                            </form>
                            <Toaster />
                        </Paper>
                    </Grid>
                </Grid>

            </Container>

        </>
    )
}

export default UserSignup
