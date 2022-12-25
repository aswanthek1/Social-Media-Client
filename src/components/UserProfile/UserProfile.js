import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import "./ProfileAreaStyles.css";
import { Box, Button, CircularProgress, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import ProfileEditingModal from "./ProfileEditingModal";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Posts from "../Posts/Posts";
import BioEditingModal from "./BioEditingModal";
import ChangingTabs from "../Tabs/ChangingTabs";
import FollowingLists from "../UserLists/FollowingLists";
import toast, { Toaster } from "react-hot-toast";
import Follow from "../People/Follow";

const UserProfile = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [bioEditingModal, setBioEditingModal] = useState(false);
  const [tabNumber, setTabNumber] = useState(1);
  const [value, setValue] = useState(1);
  const refresh = useSelector((state) => state.refresh.refresh);
  const userToken = localStorage.getItem("userToken");
  const [userProfileData, setUserProfileData] = useState({});
  const [userPost, setUserPost] = useState([]);
  const [progress, setProgress] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const profileId = localStorage.getItem("profileUser");
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/user/profile/${profileId}`)
      .then((response) => {
        setUserProfileData(response.data);
      });
  }, [refresh]);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    setProgress(true);
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/posts/getPost/${profileId}`, {
        headers: { token: userToken },
      })
      .then((response) => {
        setProgress(false);
        setUserPost(response.data);
        // dispatch(postUpdate(response.data));
      });
  }, [refresh]);

  return (
    <>
      <Toaster />
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
                  userProfileData.coverimage
                    ? userProfileData.coverimage
                    : "https://res.cloudinary.com/dm0l6abeb/image/upload/v1670160233/SocialMedia%20Assets/simple-background-texture-blue-wallpaper-preview_xazvvv.jpg"
                }
                alt=""
              />
              <img
                onClick={() => setOpenProfile(true)}
                className="profileUserImg"
                src={
                  userProfileData.profileimage
                    ? userProfileData.profileimage
                    : "https://res.cloudinary.com/dm0l6abeb/image/upload/v1669888071/SocialMedia%20Assets/blank-profile-picture_aj6but.webp"
                }
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">
                {userProfileData.firstname || userProfileData.lastname
                  ? userProfileData.firstname + " " + userProfileData.lastname
                  : null}
              </h4>
              <h5 className="profileInfoDesc">
                {userProfileData.bio ? userProfileData.bio : null}
              </h5>
            </div>
          </div>
          <div className="followButton">
            {user?._id === userProfileData?._id ? null : (
              <Follow id={userProfileData._id ? userProfileData._id : null} />
            )}
            {/* <Button
              sx={{ width: "70px", fontSize: "10px", marginLeft: "10px" }}
              color="primary"
              variant="outlined"
              size="small"
            >
              Message
            </Button> */}
          </div>

          <div className="bioMain">
            <div className="bioLeftMain">
              <div className="proffessionMain">
                <span className="proffession">Work : </span>
                <span className="proffessionName">
                  {userProfileData.proffession
                    ? userProfileData.proffession
                    : null}
                </span>
              </div>
              <br />
              <div className="livesInMain">
                <span className="livesIn">Lives in : </span>
                <span className="livesInName">
                  {userProfileData.livesin ? userProfileData.livesin : null}
                </span>
              </div>
              <br />
              <div className="countryMain">
                <span className="country">Country : </span>
                <span className="countryName">
                  {userProfileData.country ? userProfileData.country : null}
                </span>
              </div>
            </div>

            <div className="bioRightMain">
              <div className="countryMain">
                <span className="country">Email : </span>
                <span className="countryName">
                  {userProfileData.email ? userProfileData.email : null}
                </span>
              </div>
              <br />
              <div className="followersMain">
                <span className="followers">Followers : </span>
                <span className="followersNumber">
                  {userProfileData.followers
                    ? userProfileData.followers.length
                    : 0}
                </span>
              </div>
              <br />
              <div className="followingMain">
                <span className="following">Following : </span>
                <span className="followingNumber">
                  {userProfileData.following
                    ? userProfileData.following.length
                    : 0}
                </span>
              </div>
            </div>

            {user._id === userProfileData._id ? (
              <IconButton
                sx={{ position: "absolute", right: 0, bottom: "98%" }}
                onClick={() => setBioEditingModal(true)}
              >
                <EditIcon />
              </IconButton>
            ) : null}
            {/* </div> */}
          </div>

          <div>
            <div className="profileRightBottomMain">
              <div className="profileRightBottom">
                {userPost.length < 1 ? (
                  <div style={{ backgroundColor: "" }}>
                    <h2
                      style={{
                        textAlign: "center",
                        color: "red",
                        marginTop: "20px",
                      }}
                    >
                      No posts added yet
                    </h2>
                  </div>
                ) : (
                  userPost.map((postArray) => {
                    return <Posts key={postArray._id} data={postArray} />;
                  })
                )}
                {progress ? (
                  <CircularProgress
                    sx={{ align: "center", marginTop: "25px" }}
                  />
                ) : null}
              </div>

              <div className="peopleBox">
                <Box sx={{ width: "100%", bgcolor: "#EAF6F6" }}>
                  <ChangingTabs
                    setTabNumber={setTabNumber}
                    tabNumber={tabNumber}
                  />
                </Box>

                {tabNumber === 1 ? (
                  <div className="following">
                    <FollowingLists data={userProfileData.following} />
                  </div>
                ) : null}

                {tabNumber === 2 ? (
                  <div className="followers">
                    <FollowingLists data={userProfileData.followers} />
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
      {user._id === userProfileData._id ? (
        <ProfileEditingModal modalOpenState={setOpen} modalState={open} />
      ) : null}
      {user._id === userProfileData._id ? (
        <ProfileEditingModal
          profileModalOpenState={setOpenProfile}
          profileModalState={openProfile}
        />
      ) : null}
      {user._id === userProfileData._id ? (
        <BioEditingModal
          bioEditingModal={bioEditingModal}
          setBioEditingModal={setBioEditingModal}
          userProfileData={userProfileData}
          setUserProfileData={setUserProfileData}
        />
      ) : null}
    </>
  );
};

export default UserProfile;
