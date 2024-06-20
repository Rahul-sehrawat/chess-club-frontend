import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault()

    await signup(email, password, name)
  }

  return (
    <div className="mydiv ">
      <div className="SignuppageInfo">
        <img src="./gb.png" alt="" width={500} />
        
      </div>
    <form className="signup" onSubmit={handleSubmit}>
      <h3 className="text-center pt-1 font-bold font-sans text-2xl">Sign Up</h3>

      <label>Name:</label>
      <input 
        type="text" 
        onChange={(e) => setName(e.target.value)} 
        value={name} 
      />
      
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
      <button className="w-32 h-12" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
      </div>
    </form>
    </div>
  )
}

export default Signup