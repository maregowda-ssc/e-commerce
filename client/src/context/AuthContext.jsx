import { createContext, useContext, useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import api from '../services/api'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('northstar-token')) return setLoading(false)
    api.get('/auth/me').then(({ data }) => setUser(data.user)).catch(() => localStorage.removeItem('northstar-token')).finally(() => setLoading(false))
  }, [])

  const authenticate = async (endpoint, credentials) => {
    const { data } = await api.post(`/auth/${endpoint}`, credentials)
    localStorage.setItem('northstar-token', data.token)
    setUser(data.user)
    toast.success(endpoint === 'login' ? 'Welcome back' : 'Account created')
  }
  const logout = () => { localStorage.removeItem('northstar-token'); setUser(null); toast('Signed out') }
  return <AuthContext.Provider value={{ user, loading, login: (data) => authenticate('login', data), register: (data) => authenticate('register', data), logout }}>{children}</AuthContext.Provider>
}
