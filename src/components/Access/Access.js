import React from "react";
import "./Access.css";
import BlockIcon from "@mui/icons-material/Block";

const Access = () => {
  return (
    <>
      <div className="container">
        <div className="wrapper">
          <BlockIcon sx={{ fontSize: "400px", color: "red" }} />
          <h1 className="text">Access Forbidden</h1>
        </div>
      </div>
    </>
  );
};

export default Access;
