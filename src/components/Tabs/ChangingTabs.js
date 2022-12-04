import { Tab, Tabs } from "@mui/material";
import React, { useState } from "react";

const ChangingTabs = ({ setTabNumber, tabNumber, people }) => {
  const [value, setValue] = useState(0);
  console.log('value ', value)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Tabs value={value} onChange={handleChange} centered variant="fullWidth">
        <Tab
          label={
            <span style={{ fontWeight: 700 }}>
              <b>Following</b>
            </span>
          }
          onClick={() => setTabNumber(1)}
        />
        <Tab
          label={
            <span style={{ fontWeight: 700 }}>
              <b>Followers</b>
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
