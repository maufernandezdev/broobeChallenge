import './App.css'
import MainNavigator from './navigation/MainNavigator'
import SessionProvider from './context/sessionContext'

function App() {
  return (
    <SessionProvider>
      <MainNavigator></MainNavigator>
    </SessionProvider>
  )
}

export default App
