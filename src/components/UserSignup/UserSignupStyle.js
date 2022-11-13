import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    maingrid:{
       height:'300px'
    },
    firstPaper: {
        position: 'relative',
        bottom:0,
        height: 'fitContent',
        padding: '30px 30px'
    },
    signupTitle: {
        margin: 7
    },
    avatar: {
        backgroundColor: '#1bbd7e',
        
    },
    firstnamefield:{
        marginTop:14
    },
    textfield: {
        marginTop: 12,
    },
    submit: {
        marginTop: 20
    },
    textfieldDate: {
        marginTop: 12,
        float: 'left',
    },
    textfieldfirstname: {
        marginTop: 12,
    },
    textfieldlastname: {
        marginTop: 12,
    },

    errors: {
        color: 'red'
    },
    arrowBack:{
        fontSize:22,
       position:'absolute',
       zIndex:1,
       top:39,
       left:5
    },
    or:{
        marginTop:"2%"
    },
    google:{
        marginTop:"2%",
    }



}))

export default useStyles