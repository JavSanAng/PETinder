import { createContext, useState } from 'react'
import { makeRequest } from '../context/axios'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)

  const login = async credentials => {
    try {
      const response = await makeRequest.post('/auth/login', credentials)
      const token = response.data.token
      setCurrentUser({ token, user_name: credentials.user_name })
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  const logout = async () => {
    setCurrentUser(null)
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
