import React from 'react'
import axios from 'axios'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom'
// import { useState } from 'react'
import * as yup from 'yup'
import { Typography, Paper, Grid, Container } from '@material-ui/core'
import toast, { Toaster } from 'react-hot-toast';
import Avatar from '@material-ui/core/Avatar'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link'
import Button from '@material-ui/core/Button';
import Box from "@material-ui/core/Box";
import { useMediaQuery, useTheme } from '@material-ui/core'
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import FormControl from '@mui/material/FormControl';

import useStyles from './UserLoginStyles.js'



const initialValues = {
    email: '',
    password: ''
}



// const validate = (values) => {
//     let errors = {}

//     if (!values.email) {
//         errors.email = 'This field is mandatory'
//     }
//     else if (!/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/i.test(values.email)) {
//         errors.email = 'Invalid Email Format'
//     }
//     if (!values.password) {
//         errors.password = 'This field is required'
//     }
//     return errors
// }

const validationSchema = yup.object({
    email: yup.string().email('Invalid Format').required('Field is required'),
    password: yup.string()
        .required('Field is reqluired')
        .min(6, 'Password is too short - should be 8 chars minimum.')
        .max(12, 'Maximum 12 charachters are permitted')
})

function UserLogin() {

    const [values, setValues] = React.useState({
        password: '',
        showPassword: false
    })

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const theme = useTheme()
    const showGrid = useMediaQuery(theme.breakpoints.up('sm'))
    // const [loginState, setLoginState] = useState('')
    const navigate = useNavigate()
    const classes = useStyles()
    const formik = useFormik({
        initialValues,
        onSubmit: values => {
            axios.post('http://localhost:5000/login', values).then((e) => {
                if (e.data.email) {
                    localStorage.setItem('userToken',e.data.token)
                    navigate('/')
                }
                else if (e.data.message === 'user not found') {
                    //setLoginState('User Not Found')
                    toast.error('User Not Found', {
                        icon: ' 🚫 ',
                        style: {
                            width: '300px',
                            backgroundColor: 'greenyellow',
                            fontSize: '20px',
                        }
                    })
                }
            }).catch((err) => {
                console.log('error', err)
            })
        },
        // validate
        validationSchema
    })

    return (
        <>




            <Container maxWidth='md'>

                <Grid container item className={classes.mainGrid} >
                    {showGrid && <Box component={Grid}
                        item
                        md={6} sm={6} xs={12}
                        className={classes.firstgrid}
                        display={{ xs: "none", md: "block" }}>

                        <Paper elevation={6} className={classes.firstpaperSignin}>Sign in</Paper>
                    </Box>
                    }




                    <Grid item xs={12} md={6} sm={6}  >
                        {/* <Grid item xs={12}   > */}
                        <Paper elevation={6} className={classes.paper}>
                            <Grid align='center'>
                                <Avatar className={classes.avatarLock}><LockOutlinedIcon /></Avatar>

                                <h2>Sign In</h2>

                            </Grid>
                            <form onSubmit={formik.handleSubmit}>
                                <div className='form-control'>
                                    {/* { loginState ? <div className={classes.loginState}><ErrorOutlineIcon className={classes.erroricon} /> {loginState}</div> : null} */}
                                    <TextField
                                        label='Email'
                                        fullWidth
                                        type='email'
                                        name='email'
                                        placeholder='Enter your Email'
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.email} />
                                    {formik.touched.email && formik.errors.email ? <div className={classes.error}>{formik.errors.email}</div> : null}
                                </div>



                                {/* <div className='form-control'>
                                    <TextField
                                        className={classes.passwordField}
                                        label='Password'
                                        name='password'
                                        fullWidth
                                        type='password'
                                        placeholder='Enter Password'
                                        onBlur={formik.handleBlur}
                                        onChange={formik.handleChange}
                                        value={formik.values.password} />
                                    {formik.touched.password && formik.errors.password ? <div className={classes.error}>{formik.errors.password}</div> : null}
                                </div> */}



                                <FormControl variant="standard" fullWidth>
                                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                    <Input
                                        fullWidth

                                        id="standard-adornment-password"
                                        name='password'
                                        placeholder='Enter Password'
                                        className={classes.passwordField}
                                        type={values.showPassword ? 'text' : 'password'}
                                        value={formik.values.password}
                                        onChange={formik.handleChange('password')}
                                        onBlur={formik.handleBlur}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                    />
                                    {formik.touched.password && formik.errors.password ? <div className={classes.error}>{formik.errors.password}</div> : null}
                                </FormControl>



                                <FormControlLabel
                                    control={<Checkbox name="checkedB" color='primary' />}
                                    label="Remember me" />
                                <Button className={classes.buttonSignin} type='submit' variant='contained' color='primary' fullWidth>Sign in</Button>
                            </form>

                            <Toaster />

                            <Typography> <Link href="#" underline='none'> Forgot Password ?</Link></Typography>
                            <Typography>Do you have an account ?<Link onClick={() => {
                                navigate('/signup')
                            }} >Signup</Link></Typography>
                            <Typography align='center' className={classes.or} >Or</Typography>

                            <Link href='#' underline='none'><Typography align='center' className={classes.googleLogin}  >Login with Google</Typography></Link>

                        </Paper>
                    </Grid>
                </Grid>

            </Container>
        </>
    )

}

export default UserLogin
