import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import { useAuth } from '../authContext'

function Dashboard() {
    const {user, logout } = useAuth()
    const navigate = useNavigate()
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/appointments`)
          .then(res => res.json())
          .then(data => {
            const userAppointments = data.filter(a => a.userId === user.id)
            setAppointments(userAppointments)
          })
    }, [user.id])

    function handleLogout(){
        logout()
        navigate('/login')
    }

    return (
        <div>
            <h1>Welcome, {user?.name}</h1>

            <h2>Your Appointments</h2>
            {appointments.length === 0 ? (
                 <p>You have no appointmens yet.</p>
            ) : (
                appointments.map(appointment => (
                  <div key={appointment.id}>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.slot}</p>
                    <p>Status: {appointment.status}</p>
                  </div>  
                ))
            )}
           
            <button onClick={handleLogout}>Logout</button>
        </div>

    )
}

export default Dashboard
