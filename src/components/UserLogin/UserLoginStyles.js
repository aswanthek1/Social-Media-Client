import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    position: "relative",
    top: 40,
  },
  paper: {
    padding: 20,
    height: 460,
    marginInline: "auto",
  },
  firstpaperSignin: {
    padding: 20,
    height: 460,
    marginInline: "auto",
    backgroundColor: "aqua",
  },

  avatarLock: {
    backgroundColor: "green",
  },

  buttonSignin: {
    margin: "30px 0",
  },

  passwordField: {},

  or: {
    marginTop: 12,
  },

  googleLogin: {
    marginTop: 10,
  },

  loginState: {
    marginBottom: "12px",
    color: "red",
    backgroundColor: "aqua",
    textAlign: "center",
    alignItems: "center",
    width: 200,
    height: 30,
    paddingTop: 6,
    marginInline: "auto",
  },

  erroricon: {
    position: "relative",
    top: 3,
    fontSize: "medium",
    marginTop: 1,
  },

  error: {
    color: "red",
  },
}));

export default useStyles;
