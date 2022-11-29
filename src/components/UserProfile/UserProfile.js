import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import "./ProfileAreaStyles.css";
import { Button } from "@mui/material";
import ProfileEditingModal from "./ProfileEditingModal";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { update } from "../../Redux/UserSlice";
import { postUpdate } from "../../Redux/PostSlice";
import { refreshReducer } from "../../Redux/RefreshSlice";
import Posts from "../Posts/Posts";
import BioEditingModal from "./BioEditingModal";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [bioEditingModal, setBioEditingModal] = useState(false);
  const [userDetails, setUserDetails] = useState({});
  const user = useSelector((state) => state.user);
  const refresh = useSelector((state) => state.refresh.refresh);
  const postsDetails = useSelector((state) => state.post);

  const follow = () => {};


  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}`, {
        headers: { token: userToken },
      })
      .then((response) => {
        console.log("userdetails", response);
        if (response.data.message === "userNotFound") {
          return null;
        } else {
          setUserDetails(response.data);
          // dispatch(update(response.data));

        }
      });
  }, []);


  const userToken = localStorage.getItem("userToken");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/getPost`, {
        headers: { token: userToken },
      })
      .then((response) => {
        // setPostDetails(e.data)
        dispatch(postUpdate(response.data));
      });
  }, [refresh]);
  

  return (
    <>
      <Navbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                onClick={() => {
                  setOpen(true);
                }}
                className="profileCoverImg"
                src={
                  user.coverimage
                    ? user.coverimage[0]
                    : "https://c4.wallpaperflare.com/wallpaper/604/298/500/simple-background-texture-blue-wallpaper-preview.jpg"
                }
                alt=""
              />
              <img
                onClick={() => setOpenProfile(true)}
                className="profileUserImg"
                src={
                  user.profileimage
                    ? user.profileimage[0]
                    : "/Assets/blank-profile-picture.webp"
                }
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {user.firstname} {user.lastname}
              </h4>
              <h5 className="profileInfoDesc">
                Hello my friends ! Iam Aswanth. Iam a software Engineer. Works
                at Clicut Kinfra  Hello my friends ! Iam 
              </h5>
            </div>
          </div>
          <div className="followButton">
            <Button
              sx={{ width: "70px", fontSize: "10px", marginRight: "10px" }}
              color="primary"
              variant="outlined"
              size="small"
              onClick={follow}
            >
              follow
            </Button>
            <Button
              sx={{ width: "70px", fontSize: "10px", marginLeft: "10px" }}
              color="primary"
              variant="outlined"
              size="small"
            >
              Message
            </Button>
          </div>

          <div className="bioMain">
            <div className="bioLeftMain">
              <div className="proffessionMain">
                <span className="proffession">Work : </span>
                <span className="proffessionName">Software Engineer</span>
              </div>
              <br />
              <div className="livesInMain">
                <span className="livesIn">Lives in : </span>
                <span className="livesInName">Kannur</span>
              </div>
              <br />
              <div className="stateMain">
                <span className="state">State : </span>
                <span className="stateName">Kerala</span>
              </div>
            </div>

            <div className="bioRightMain">
              <div className="countryMain">
                <span className="country">Email : </span>
                <span className="countryName">aswanthek1@gmail.com</span>
              </div>
              <br />
              <div className="followersMain">
                <span className="followers">followers : </span>
                <span className="followersNumber">67</span>
              </div>
              <br />
              <div className="followingMain">
                <span className="following">Following : </span>
                <span className="followingNumber">89</span>
              </div>
            </div>
          </div>

          <div>
            <div className="infoList">
              <span>
                <Button
                  color="primary"
                  sx={{ width: "70px", fontSize: "10px" }}
                  variant="outlined"
                  size="small"
                >
                  Following
                </Button>
              </span>
              <span>
                <Button
                  color="primary"
                  sx={{ width: "70px", fontSize: "10px" }}
                  variant="outlined"
                  size="small"
                >
                  Followers
                </Button>
              </span>
              <span>
                <Button
                  onClick={() => setBioEditingModal(true)}
                  color="primary"
                  sx={{ width: "94px", fontSize: "10px" }}
                  variant="outlined"
                  size="small"
                >
                  Edit Profile
                </Button>
              </span>
            </div>
            <div className="profileRightBottom">
              {postsDetails.post.map((postArray) => {
                return (
                  <Posts key={postArray._id} data={postArray} />
                  // <ProfileArea key={postArray._id} data={postArray} />
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <ProfileEditingModal modalOpenState={setOpen} modalState={open} />
      <ProfileEditingModal
        profileModalOpenState={setOpenProfile}
        profileModalState={openProfile}
      />
      <BioEditingModal
        bioEditingModal={bioEditingModal}
        setBioEditingModal={setBioEditingModal}
      />
    </>
  );
};

export default UserProfile;
