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
            display: "flex", 
            flexDirection: "row",
            height: "100vh",
            width: "100vw"
        }}>
            <NavBarSide isConnected={isConnected} />
            <Settings />
        </Box>
    )
}

export default PSettings