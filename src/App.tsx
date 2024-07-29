// import Account from './Account'
import '../dist/css/styles.min.css'
import CLIFunctions from './components/CLIFunctions'
import BotSettings from './components/BotSettings'
import Logs from './components/Logs'
import PositionMonitor from './components/PositionMonitor'
import Account from './Account'

function App() {

  return (
    <>
      <Account />
      <CLIFunctions />
      <BotSettings/>
      <PositionMonitor />
      <Logs />
    </>
  )
}

export default App
