// import Account from './Account'
import '../dist/css/styles.min.css'
import CLIFunctions from './components/CLIFunctions'
import BotSettings from './components/BotSettings'
import Logs from './components/Logs'
import PositionMonitor from './components/PositionMonitor'

function App() {

  return (
    <>
      <CLIFunctions />
      <BotSettings/>
      <PositionMonitor />
      <Logs />
    </>
  )
}

export default App
