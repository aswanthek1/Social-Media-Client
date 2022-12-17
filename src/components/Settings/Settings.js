import { Box, Stack } from "@mui/material";
import React from "react";
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import EditPassword from "../EditPassword/EditPassword";
import Navbar from "../Navbar/Navbar";
import Privacy from "../Privacy/Privacy";
import Sidebar from "../Sidebar/Sidebar";
import ChangingTabs from "../Tabs/ChangingTabs";

const Settings = () => {
  const [tabNumber, setTabNumber] = useState(1);
  return (
    <div>
      <Box bgcolor={"background.default"}>
        <Navbar />
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Sidebar />
          <Box flex={4} paddingTop={1}>
            <ChangingTabs
              setTabNumber={setTabNumber}
              tabNumber={tabNumber}
              settings={true}
            />
           {tabNumber===1 ? <EditPassword /> : null}
           {tabNumber===2 ? <Privacy/> : null}
           </Box>
        </Stack>
      </Box>
      <Toaster/>
    </div>
  );
};

export default Settings;
