import { Settings } from "./components/Settings";
import NavBarSide from "./components/NavBarSide";
import { Box } from "@mui/material";
import { useEffect } from "react";
import useSocket from "./socket";

function PSettings() {
    const {eventLog, isConnected} = useSocket();

    // Perhaps use eventLog for settings error messages? 

    return (
        <Box className="app" sx={{
            display: 'flex', height:'100vh', width: '100vw',
          justifyContent: 'flex-start', alignItems: 'stretch',
          overflowX: 'hidden',
          overflowY: 'hidden',
        }}>
            <NavBarSide isConnected={isConnected} />
            <Settings />
        </Box>
    )
}

export default PSettings