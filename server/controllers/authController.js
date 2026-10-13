import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const tokenFor = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })
const safeUser = (user) => ({ id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin })

export const register = async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ message: 'Name, email and password are required' })
  if (await User.findOne({ email })) return res.status(409).json({ message: 'An account already exists for this email' })
  const user = await User.create({ name, email, password })
  res.status(201).json({ user: safeUser(user), token: tokenFor(user._id) })
}

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email })
  if (!user || !(await user.comparePassword(req.body.password))) return res.status(401).json({ message: 'Incorrect email or password' })
  res.json({ user: safeUser(user), token: tokenFor(user._id) })
}

export const me = async (req, res) => res.json({ user: safeUser(req.user) })
