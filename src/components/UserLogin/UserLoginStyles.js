import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    mainGrid: {
        position: 'relative',
        top: 40
    },

    firstgrid: {
        // display:"none",
    },

    paper: {
        padding: 20,
        height: 460,
        marginInline: 'auto',
    },
    firstpaperSignin: {
        padding: 20,
        height: 460,
        marginInline: 'auto',
        backgroundColor: 'aqua'
    },

    avatarLock: {
        backgroundColor: 'green'
    },

    buttonSignin: {
        margin: '30px 0'
    },

    passwordField: {
        // marginTop: '400px'
    },

    or: {
        marginTop: 12
    },

    googleLogin: {
        marginTop: 10,
    },

    loginState: {
        marginBottom: "12px",
        color: 'red',
        backgroundColor: 'aqua',
        textAlign: 'center',
        alignItems: 'center',
        width: 200,
        height: 30,
        paddingTop: 6,
        marginInline: 'auto'
    },

    erroricon: {
        position: 'relative',
        // left:,
        top: 3,
        fontSize: 'medium',
        marginTop: 1
    },

    error: {
        color: 'red'
    }



}))

export default useStyles