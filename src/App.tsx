// import Account from './Account'
import '../dist/css/styles.min.css'
import Logs from './components/Logs'
import PositionMonitor from './components/PositionMonitor'
import NavBarSide from './components/NavBarSide';

function App() {

  return (
    <div className="app">
      <NavBarSide />
      <div className="app-main">
        <PositionMonitor />
        <Logs />
      </div>
    </div>
  )
}

export default App
