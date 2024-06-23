import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()

  const handleClick = () => {
    logout()
  }
  return (
    <header>
      <div className="container">
        <Link to="/">
          <div className=' flex items-center'>
            <img src="/picon.png" alt="chess club icon" width={50} />
            <h1 className=' text-white font-bold text-xl font-sans'>Chess Club</h1>
          </div>
        </Link>
        <nav>
          {user && (
            <div className='flex items-center group '>
                  <Link to="/computer" className='text-white text-xl font-sans' >
                    <img src="bot2.png" width={46}  />
                </Link>
                 <Link to='/profile'>
                    <img src='./avatar.png' width={36} />
                    <div className='hidden group-hover:flex absolute mt-2 '>
                <p className='text-xl border border-gray-400 bg-gray-900 pl-2 pr-2 w-fit rounded-md h-8 text-white'>{user.name}</p>
              </div>
                  </Link>
              
                 
              <button onClick={handleClick}>
                <img src='./logout.png' width={36} />
              </button>
            </div>
          )}
          {!user && (
            
              <div className='w-96 flex items-center gap-1'  >
                <Link to="/computer" className='text-white text-xl font-sans' >
                    <img src="bot2.png" width={46}  />
                </Link>
        
                <Link to="/login" className='text-white text-xl font-sans text-center  p-1 rounded-md  bg-slate-600 w-20 h-9 ' >Login</Link>
           
                <Link to="/signup" className=' text-white text-xl font-sans text-center  p-1 rounded-md  bg-slate-600 w-20 h-9'>Signup</Link>
              </div>
         
          
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar