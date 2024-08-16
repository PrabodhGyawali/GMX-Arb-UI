import BotSettings from "./PSettings/BotSettings";
import { useNavigate } from "react-router-dom";
import SettingsIcon from '@mui/icons-material/Settings';
import { Box, IconButton } from "@mui/material";
/**
 * Navbar button button to acess settings page
 */
function SettingsButton() {
    const navigate = useNavigate();

    return (
        <Box className="side-bar-footer" sx={{}}>
            <IconButton onClick={() => {navigate("/settings")}}>
                <SettingsIcon/>
            </IconButton>
        </Box>
    )
}


function Settings() {
    return (
        <section className="MainSettings">
            <BotSettings />
        </section>
    )
}

export {SettingsButton, Settings}

