import React from "react";
import ProfileArea from "../ProfileArea/ProfileFeedArea";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useSelector } from 'react-redux'
import '../ProfileArea/ProfileAreaStyles.css'
import { Button } from "@mui/material";
import ProfileEditingModal from "../ProfileArea/ProfileEditingModal";
import { useState } from "react";
import axios from "axios";


const UserProfile = () => {
    const [open, setOpen] = useState(false)
    const [openProfile, setOpenProfile] = useState(false)
    const user = useSelector(state => state.user)


    const follow = ()=>{
        
    }

    return (
        <>
            <Navbar />
            <div className='profile'>
                <Sidebar />
                <div className="profileRight">
                    <div className="profileRightTop">
                        <div className="profileCover">
                            <img
                                onClick={() => { setOpen(true) }}
                                className="profileCoverImg"
                                src="https://images.unsplash.com/photo-1589489873423-d1745278a8f4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c2NvdGxhbmR8ZW58MHx8MHx8&w=1000&q=80" alt="" />
                            <img
                                onClick={() => setOpenProfile(true)}
                                className="profileUserImg"
                                src="https://thumbs.dreamstime.com/b/handsome-male-model-posing-elegant-smile-88528667.jpg" alt="" />
                        </div>
                        <div className="profileInfo">
                            <h4 className='profileInfoName'>Aswanth Raveendran E K</h4>
                            <span className='profileInfoDesc'>Hello my friends !</span>
                        </div>
                    </div>
                    <div className='followButton'>
                        <Button sx={{ width: '70px', fontSize: '10px', marginRight: '10px' }} color='primary' variant='outlined' size='small' onClick={follow} >follow</Button>
                        <Button sx={{ width: '70px', fontSize: '10px', marginLeft: '10px' }} color='primary' variant='outlined' size='small' >Message</Button>
                    </div>
                    <div>
                        <div className="infoList">
                            <span>
                                <Button color='primary' sx={{ width: '70px', fontSize: '10px' }} variant='outlined' size='small'>Following</Button>
                            </span>
                            <span>
                                <Button color='primary' sx={{ width: '70px', fontSize: '10px' }} variant='outlined' size='small'>Followers</Button>
                            </span>
                            <span>
                                <Button color='primary' sx={{ width: '94px', fontSize: '10px' }} variant='outlined' size='small'>Edit Profile</Button>
                            </span>
                        </div>
                        <div className="profileRightBottom" >
                            <ProfileArea />
                        </div>
                    </div>

                </div>
            </div>
            <ProfileEditingModal modalOpenState={setOpen} modalState={open} />
            <ProfileEditingModal profileModalOpenState={setOpenProfile} profileModalState={openProfile} />
        </>
    )
}


export default UserProfile