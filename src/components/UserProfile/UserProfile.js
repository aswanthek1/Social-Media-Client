import React from "react";
import ProfileArea from "../ProfileArea/ProfileFeedArea";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useSelector } from 'react-redux'
import { Box } from "@mui/system";
import '../ProfileArea/ProfileAreaStyles.css'
import ProfileRightBar from '../ProfileArea/ProfileRightBar'
import { IconButton } from "@mui/material";
import { Edit } from "@mui/icons-material";

const UserProfile = () => {
    const user = useSelector(state => state.user)
    return (
        <>
            <Navbar />
            <div className='profile'>
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                className="profileCoverImg"
                                src="https://images.unsplash.com/photo-1589489873423-d1745278a8f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2NvdGxhbmR8ZW58MHx8MHx8&w=1000&q=80" alt="" />
                            <img
                                className="profileUserImg"
                                src="https://thumbs.dreamstime.com/b/handsome-male-model-posing-elegant-smile-88528667.jpg" alt="" />
                        </div>


                        <div className='viewMore'> 
                        <button className='viewMoreButton'>View More</button>
                        </div>


                        <div className='editProfile'> 
                            <IconButton className='editProfileButton'>
                                <Edit/>
                            </IconButton>
                        </div>


                        <div className="profileInfo">
                            <h4 className='profileInfoName'>Aswanth Raveendran E K</h4>
                            <span className='profileInfoDesc'>Hello my friends !</span>
                        </div>
                    </div>
                    <div className="profileRightBottom" >
                         <ProfileArea />               
                        {/* <ProfileRightBar /> */}
                       
                    </div>
                </div>


            </div>
        </>
    )
}


export default UserProfile