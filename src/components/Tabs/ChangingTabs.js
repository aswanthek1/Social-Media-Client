import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const ChangingTabs = ({ setTabNumber, tabNumber, people, settings }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered variant="fullWidth">
        <Tab
          label={
            <span style={{ fontWeight: 700 }}>
             {settings ? <b>Change Password</b> :  <b>Following</b>}
            </span>
          }
          onClick={() => setTabNumber(1)}
        />
        <Tab
          label={
            <span style={{ fontWeight: 700 }}>
              {settings ? <b>Privacy</b> :  <b>Followers</b>}
            </span>
          }
          onClick={() => setTabNumber(2)}
        />

       { people===true ? <Tab
          label={
            <span style={{ fontWeight: 700 }}>
              <b>You may know</b>
            </span>
          }
          onClick={() => setTabNumber(3)}
        /> : null}
      </Tabs>
    </div>
  );
};

export default ChangingTabs;
