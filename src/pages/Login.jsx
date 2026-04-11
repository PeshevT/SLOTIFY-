import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateEmail, validatePassword } from '../utils/validators'
import { loginUser } from '../services/authService'
import { useAuth } from '../authContext'

function Login() {
    const navigate = useNavigate()
    const { login } = useAuth()

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const [errors, setErrors] = useState({})
    const [serverError, setServerError] = useState(null)

    function handleChange(e) {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    function validate(){
        const newErrors = {}
        const emailError = validateEmail(formData.email)
        const passwordError = validatePassword(formData.password)

        if (emailError) newErrors.email = emailError
        if (passwordError) newErrors.password = passwordError

        return newErrors
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setServerError(null)
        setErrors({})

        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0){
            setErrors(validationErrors)
            return
        }

        try {
            const userData = await loginUser(formData.email, formData.password)
            login(userData)
            navigate('/dashboard')
        } catch (error) {
            setServerError(error.message)
        }
    }

    return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>
        {serverError && <p>{serverError}</p>}

        <button type="submit">Login</button>
      </form>

      <p>Don't have an account? <Link to="/register">Register</Link></p>
    </div>        
    )
}

export default Login
