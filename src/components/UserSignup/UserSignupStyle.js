import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({

    firstPaper: {
        position: 'relative',
        bottom:0,
        height: 'fitContent',
        padding: '30px 30px'
    },
    formGrid: {
        marginTop: 50
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
        marginTop: 12
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
        // marginRight:50,
    //   float:'left'   
    },
    textfieldlastname: {
        marginTop: 12,
        // marginLeft:50,      
        // float:'right' ,
    },
    // root: {
    //     '& > *': {
    //     //   margin: theme.spacing(4),
    //       width: '35ch',
    //     },
    //   },
    errors: {
        color: 'red'
    },
    arrowBack:{
        fontSize:22,
       position:'absolute',
       zIndex:1,
       top:39,
       left:5
    }



}))

export default useStyles