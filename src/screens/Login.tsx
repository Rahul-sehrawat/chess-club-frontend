import { useState } from "react"
import { useLogin } from "../hooks/useLogin"
import Navbar from "../components/Navbar"

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    await login(email, password)
  }

  return (
    <div className="loginContainer">
      <Navbar/>
    <div className=" flex justify-evenly " >
    <form className="login" onSubmit={handleSubmit}>
      <h3 className="text-center pt-1 font-bold font-sans text-2xl">Log In</h3>
      
      <label>Email address:</label>
      <input 
        type="email" 
        onChange={(e) => setEmail(e.target.value)} 
        value={email} 
      />
      <label>Password:</label>
      <input 
        type="password" 
        onChange={(e) => setPassword(e.target.value)} 
        value={password} 
      />

      <div className="mybtn">
      <button className="w-32 h-12" disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
      </div>
    </form>
    </div>
    </div>
  )
}

export default Login