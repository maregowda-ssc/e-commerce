import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { AuthForm } from './Login'
export default function Register() { const { register } = useAuth(); const navigate = useNavigate(); const [form, setForm] = useState({ name: '', email: '', password: '' }); const [error, setError] = useState(''); const submit = async (event) => { event.preventDefault(); try { await register(form); navigate('/shop') } catch (err) { setError(err.response?.data?.message || 'Unable to create account') } }; return <AuthForm title="Make yourself at home" subtitle="Create an account for faster checkout and order tracking." form={form} setForm={setForm} submit={submit} error={error} mode="register" /> }
