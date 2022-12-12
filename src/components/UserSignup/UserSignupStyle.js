import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  maingrid: {
    height: "300px",
  },
  firstPaper: {
    bottom: 0,
    height: "fitContent",
    padding: "30px 30px",
    width: "321px",
    marginTop: "3%",
    borderRadius: "6px",
  },
  signupTitle: {
    margin: 7,
  },
  avatar: {
    backgroundColor: "#1bbd7e",
  },
  firstnamefield: {
    marginTop: 14,
  },
  textfield: {
    marginTop: 12,
  },
  submit: {
    marginTop: 20,
  },
  textfieldDate: {
    marginTop: 12,
    float: "left",
  },
  textfieldfirstname: {
    marginTop: 12,
  },
  textfieldlastname: {
    marginTop: 12,
  },

  errors: {
    color: "red",
  },
  or: {
    marginTop: "2%",
  },
  google: {
    marginTop: "2%",
  },
}));

export default useStyles;
