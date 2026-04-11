import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { validateName, validateEmail, validatePassword, validateConfirmPassword } from '../utils/validators'
import { registerUser } from '../services/authService'

function Register() {
  const navigate = useNavigate()

  //State:  From line 10 up to line 18, stores what user types
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState(null)

  // Updates state of every keystroke
  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  // Runs validators before submiting 
  function validate() {
    const newErrors = {}
    const nameError = validateName(formData.name)
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)
    const confirmError = validateConfirmPassword(formData.password, formData.confirmPassword)

    if (nameError) newErrors.name = nameError
    if (emailError) newErrors.email = emailError
    if (passwordError) newErrors.password = passwordError
    if (confirmError) newErrors.confirmPassword = confirmError

    return newErrors
  }

  // Prevent default from reload, runs validation, calls registerUser, redirects to /login on success
  async function handleSubmit(e) {
    e.preventDefault()
    setServerError(null)

    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    try {
      await registerUser(formData.name, formData.email, formData.password)
      navigate('/login')
    } catch (error) {
      setServerError(error.message)
    }
  }

  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>

        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>

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

        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        </div>

        {serverError && <p>{serverError}</p>}

        <button type="submit">Register</button>
      </form>

      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}

export default Register
