import { Settings } from "./components/Settings";
import NavBarSide from "./components/NavBarSide";
import { Box } from "@mui/material";
import { useSocket } from "./Context/SocketContext";
function PSettings() {
    const { connected } = useSocket();
    return (
        <Box className="app" sx={{
            display: 'flex', height:'100vh', width: '100vw',
            justifyContent: 'flex-start', alignItems: 'stretch',
            overflowX: 'hidden',
            overflowY: 'hidden',
        }}>
            <NavBarSide isConnected={connected} />
            <Settings />
        </Box>        
    )
}

export default PSettings