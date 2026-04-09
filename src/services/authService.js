const API_URL = 'http://localhost:3001'

export async function registerUser(name, email, password) {
  // Check if email already exists
  const response = await fetch(`${API_URL}/users?email=${email}`)
  const existingUsers = await response.json()

  if (existingUsers.length > 0) {
    throw new Error('Email already registered')
  }

  // Save new user to db.json
  const newUser = {
    name,
    email,
    password,
    role: 'client'
  }

  const saveResponse = await fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newUser)
  })

  if (!saveResponse.ok) {
    throw new Error('Failed to register. Please try again.')
  }

  return await saveResponse.json()
}

export async function loginUser(email, password) {
  const response = await fetch(`${API_URL}/users?email=${email}&password=${password}`)
  const users = await response.json()

  if (users.length === 0) {
    throw new Error('Invalid email or password')
  }

  return users[0]
}
