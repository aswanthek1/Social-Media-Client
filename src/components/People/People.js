import React, { useState } from "react";
import "./PeopleStyle.css";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { addAllUsers } from "../../Redux/AllUserSlice";
import { Toaster } from "react-hot-toast";
import FollowersLists from "../UserLists/FollowersLists";
import FollowingLists from "../UserLists/FollowingLists";
import YouMayKnow from "../UserLists/YouMayKnow";
import ChangingTabs from "../Tabs/ChangingTabs";

const People = () => {
  const dispatch = useDispatch();
  const [tabNumber, setTabNumber] = useState(1);
  const [value, setValue] = useState(0);
  const [youMayKnow, setYouMayKnow] = useState([]);
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const refresh = useSelector((state) => state.refresh.refresh);
  useEffect(() => {
    const userToken = localStorage.getItem("userToken");
    try {
      axios
        .get(`${process.env.REACT_APP_BACKEND_URL}/users`, {
          headers: { token: userToken },
        })
        .then((response) => {
          dispatch(addAllUsers(response.data.allUsers));
          setYouMayKnow(response.data.exceptFollowing);
          setFollowing(response.data.following);
          setFollowers(response.data.followers);
        });
    } catch (error) {
      console.log(error);
    }
  }, [refresh]);

  return (
    <>
      <Navbar />
      <div className="people">
        <Sidebar />
        <div className="peopleRight">
          <Box sx={{ width: "100%", bgcolor: "#EAF6F6" }}>
            <ChangingTabs
              setTabNumber={setTabNumber}
              tabNumber={tabNumber}
              people={true}
            />
          </Box>
          <div className="cards">
            {tabNumber === 1 ? (
              <div>
                <FollowingLists following={following} people={true} />
              </div>
            ) : null}

            {tabNumber === 2 ? (
              <div className="tabTwo">
                <FollowersLists followers={followers} people={true} />
              </div>
            ) : null}

            {tabNumber === 3 ? (
              <div className="tabThree">
                <YouMayKnow youMayKnow={youMayKnow} />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default People;
