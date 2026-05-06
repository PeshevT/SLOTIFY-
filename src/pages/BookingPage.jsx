import {useState, useEffect} from 'react'
import { useParams, useNavigate} from 'react-router-dom'
import { useAuth } from '../authContext'
import './BookingPage.css'

function BookingPage (){
    const { professionalId } = useParams()
    const navigate = useNavigate()
    const { user } = useAuth()
    const [professional, setProfessional] = useState(null)
    const [selectedSlot, setSelectedSlot] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [message, setMessage] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:3001/professionals/${professionalId}`)
           .then(res => res.json())
           .then(data => setProfessional(data))
    }, [professionalId])

    async function handleBooking(){
        if (!selectedSlot || !selectedDate){
            setMessage('Please select a date and time slot.')
            return
        }

        const appointment = {
            userId: user.id,
            professionalId: professional.id,
            serviceId: professional.serviceId,
            date: selectedDate,
            slot: selectedSlot,
            status: 'confirmed'
        }

        await fetch('http://localhost:3001/appointments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(appointment)
        })

        setMessage('Appointment booked successfully!')
        setTimeout(() => navigate('/dashboard'), 2000)
    }

    if (!professional) return <p>Loading...</p>

    return (
        <div className='booking-container'>
            <h1>Book with {professional.name}</h1>
            <p>{professional.bio}</p>

            <h2>Select a Date</h2>
            <input 
              type="date"
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
            />  

            <h2>Select a Time Slot</h2>
            <div className="slots-grid">
               {professional.availableSlots.map(slot => (
                  <button
                    key={slot}
                    onClick={() => setSelectedSlot(slot)}
                    className={selectedSlot === slot ? 'slot-button selected' : 'slot-button'}
                  >
                    {slot}
                  </button>
                ))}
            </div>

            {message && <p className="booking-message">{message}</p>}

            <button className="confirm-button" onClick={handleBooking}>Confirm Booking</button>
        </div>
    )
}

export default BookingPage