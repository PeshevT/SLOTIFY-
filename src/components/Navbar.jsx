import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../authContext'

function Navbar() {
    const { user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout() {
        logout()
       navigate('/login')
    }

    return (
        <nav>
            <Link to="/">Slotify</Link>

            <div>
                {user ?(
                    <>
                      <span>Hello, {user.name}</span>
                      <Link to="/dashboard">Dashboard</Link>
                      <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                      <Link to="/Login">Login</Link>
                      <Link to="/register">Register</Link>
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar