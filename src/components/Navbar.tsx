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
                  </Link>
              {/* <div className='hidden group-hover:flex'>
                <p className='text-xl text-white'>{user.email}</p>
              </div> */}
                 
              <button onClick={handleClick}>
                <img src='./logout.png' width={36} />
              </button>
            </div>
          )}
          {!user && (
            <div className='w-96 flex gap-3'  >
                <Link to="/computer" className='text-white text-xl font-sans' >
                    <img src="bot2.png" width={46}  />
                </Link>
              
              <div className='text-white p-1 rounded-md  bg-slate-600 w-20  '><Link to="/login" className='text-white text-xl font-sans' >Login</Link></div>
              <div className='  text-white p-1 rounded-md  bg-slate-600 w-24  '><Link to="/signup" className=' text-white text-xl font-sans'>Signup</Link></div>
            </div>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Navbar