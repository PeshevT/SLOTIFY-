import { useState, useEffect } from 'react'
import { useAuth } from '../authContext'
import  './Dashboard.css'

function Dashboard() {
    const {user} = useAuth()
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
        fetch(`http://localhost:3001/appointments`)
          .then(res => res.json())
          .then(data => {
            const userAppointments = data.filter(a => a.userId === user.id)
            setAppointments(userAppointments)
          })
    }, [user.id])

    return (
        <div className='dashboard-container'>
            <h1>Welcome, {user?.name}</h1>

            <h2>Your Appointments</h2>
            {appointments.length === 0 ? (
                 <p className='no-appointments'>You have no appointmens yet.</p>
            ) : (
                appointments.map(appointment => (
                  <div key={appointment.id} className='appointment-card'>
                    <p>Date: {appointment.date}</p>
                    <p>Time: {appointment.slot}</p>
                    <p className='appointment-status'>Status: {appointment.status}</p>
                  </div>  
                ))
            )}
        </div>

    )
}

export default Dashboard
