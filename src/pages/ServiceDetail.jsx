import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import'./ServiceDetail.css'

function ServiceDetail () {
    const { id } = useParams()
    const navigate = useNavigate()
    const [service, setService] = useState(null)
    const [professionals, setProfessionals] = useState([])

    useEffect(() => {
       fetch(`http://localhost:3001/services/${id}`)
        .then(res => res.json())
        .then(data => setService(data))

       fetch(`http://localhost:3001/professionals`)
        .then(res => res.json())
        .then(data => {
          const filtered = data.filter(p => p.serviceId === id)
          setProfessionals(filtered)
        })
        }, [id])

        if (!service) return <p>Loading...</p>

        return (
            <div className='service-detail-container'>
                <h1>{service.name}</h1>
                <p>{service.description}</p>
                <div className="service-info">
                  <span>{service.duration} min</span>
                  <span>${service.price}</span>
                </div>

                <h2>Available Professionals</h2>
                {professionals.map(professional => (
                   <div key={professional.id} className="professional-card">
                     <div>
                       <h3>{professional.name}</h3>
                       <p>{professional.bio}</p>
                     </div>
                     <button onClick={() => navigate(`/book/${professional.id}`)}>
                        Book with {professional.name}
                     </button>
                   </div>
                ))}
            </div>
        )
}

export default ServiceDetail