import BotSettings from "./PSettings/BotSettings";
import { useNavigate } from "react-router-dom";
/**
 * Navbar button button to acess settings page
 */
function SettingsButton() {
    const navigate = useNavigate();

    return (
        <section className="side-bar-footer">
            <button className="open-settings"
                    onClick={() => {navigate("/settings")}}>
            </button>
        </section>
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

