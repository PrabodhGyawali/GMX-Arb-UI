import CLIFunctions from '../components/CLIFunctions'
import {SettingsButton} from '../components/BotSettings'
import CustomSVG from "../../public/svg/createArrowSVG"

function NavBarSide() {
    return (
        <div className="side-bar">
        <div className="side-bar-top">
          <img src="../public/svg/gmx-logo.svg" alt="" style={{width:48, height:48}}/>
          <CustomSVG
                    size={24}
                    ratio={1}
                    direction="right"
                    isExpanded={true}
                    className="custom-svg"
                    // style={{ fill: 'blue', stroke: 'red'}}
          />
        </div>
        
        <CLIFunctions />
        <SettingsButton/> 
      </div>
    )
}

export default NavBarSide;