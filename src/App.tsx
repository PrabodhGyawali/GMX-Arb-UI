// import Account from './Account'
import '../dist/css/styles.min.css'
import CLIFunctions from './components/CLIFunctions'
import BotSettings from './components/BotSettings'
import Logs from './components/Logs'
import PositionMonitor from './components/PositionMonitor'

function App() {

  return (
    <div className="app">
      <div className="side-bar">
        <div className="side-bar-top">
          <img src="../public/logo.png" alt="" />
          <button className="side-bar-collapse"></button>
        </div>
        
        <CLIFunctions />
        <BotSettings/> 
      </div>
      <div className="app-main">
        <PositionMonitor />
        <Logs />
      </div>
    </div>
  )
}

export default App
