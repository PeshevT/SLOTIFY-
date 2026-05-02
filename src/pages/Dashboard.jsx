import { useNavigate } from "react-router-dom"
import { useAuth } from '../authContext'

function Dashboard() {
    const {user, logout } = useAuth()
    const navigate = useNavigate()

    function handleLogout(){
        logout()
        navigate('/login')
    }

    return (
        <div>
            <h1>Welcome, {user?.name}</h1>
            <p>Your appointmens will appear here</p>
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
}

export default Dashboard
