import { BrowserRouter, Route, Routes ,Navigate } from "react-router-dom";
import { Game } from './screens/Game';
import Computer from './screens/Computer';
import { useAuthContext } from './hooks/useAuthContext'

// pages & components
import Home from './screens/Home'
import Login from './screens/Login'
import Signup from './screens/Signup'
import Profile from './screens/Profile';

function App() {
  const {user} = useAuthContext()
  return (
      <BrowserRouter>  
          <Routes>
            <Route 
              path="/" 
              element={user ? <Home/> : <Navigate to="/login" />} 
            />
            <Route 
              path="/login" 
              element={!user ? <Login /> : <Navigate to="/" />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup /> : <Navigate to="/" />} 
            />
            <Route 
              path="/game" 
              element={user ? <Game /> : <Navigate to="/" />} 
            />
            <Route 
              path="/computer" 
              // element={user ? <Computer /> : <Navigate to="/" />} 
              element={<Computer/>}
            />
            <Route 
              path="/profile" 
              element={user ? <Profile /> : <Navigate to="/" />} 
            />
          </Routes>
     
      </BrowserRouter>
      



  )
}

export default App
