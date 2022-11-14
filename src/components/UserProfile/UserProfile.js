import React from "react";
import ProfileArea from "../ProfileArea/ProfileArea";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { useSelector } from 'react-redux'
import { Box } from "@mui/system";

const UserProfile = () => {
    const user = useSelector(state => state.user)
    return (
        <>
            <Navbar />
        <div>
            <Box>
                <Sidebar />
                <ProfileArea />
            </Box>
        </div>
        </>
    )
}


export default UserProfile