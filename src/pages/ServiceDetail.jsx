import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

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
            <div>
                <h1>{service.name}</h1>
                <p>{service.description}</p>
                <p>Duration: {service.duration} min</p>
                <p>Price: ${service.price}</p>

                <h2>Available Professionals</h2>
                {professionals.map(professional => (
                    <div key={professional.id}>
                        <h3>{professional.name}</h3>
                        <p>{professional.bio}</p>
                        <button onClick={() => navigate(`/book/${professional.id}`)}>
                            Book with {professional.name}
                        </button>
                    </div>
                ))}
            </div>
        )
}

export default ServiceDetail