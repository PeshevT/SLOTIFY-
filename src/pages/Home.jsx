import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {
const [services, setServices] = useState([])
const navigate = useNavigate()

useEffect(() => {
  fetch('http://localhost:3001/services')
      .then(res => res.json())
      .then(data => setServices(data))
}, [])

  return (
    <div className="home-container" >
      <h1>Welcome to Slotify</h1>
      <p>Book appointments with professionals easily.</p>
      <h2>Our Services</h2>  
      <div className="services-grid">
        {services.map(service => (
          <div key={service.id}  className="service-card">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Duration: {service.duration} min</p>
            <p>Price: ${service.price}</p>
            <button onClick={() => navigate (`/services/${service.id}`)}>
              Book Now
            </button>
          </div>
        ))}

      </div>
    </div>
  )
}

export default Home
