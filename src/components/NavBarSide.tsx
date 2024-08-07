import CLIFunctions from '../components/CLIFunctions'
import {SettingsButton} from './Settings'
import CustomSVG from "../../public/svg/createArrowSVG"
import { useNavigate } from 'react-router-dom'

function NavBarSide() {
    const navigateHome = useNavigate();
    return (
        <div className="side-bar">
        <div className="side-bar-top">
          <img onClick={() => {navigateHome("/")}} src="../public/svg/gmx-logo.svg" alt="" style={{width:48, height:48}}/>
          <CustomSVG
            size={36}
            ratio={1}
            direction="right"
            isExpanded={true}
            className="custom-svg"
          />
        </div>
        
        <CLIFunctions />
        <SettingsButton/> 
      </div>
    )
}

export default NavBarSide;

// TODO: Add GMX button click effect
