import Order from '../models/Order.js'
import Product from '../models/Product.js'
import Stripe from 'stripe'

export const createOrder = async (req, res) => {
  const { items, shippingAddress, paymentMethod = 'card' } = req.body
  if (!items?.length) return res.status(400).json({ message: 'Your cart is empty' })
  const products = await Product.find({ _id: { $in: items.map((item) => item.product) } })
  const normalizedItems = items.map((item) => {
    const product = products.find((entry) => String(entry._id) === String(item.product))
    if (!product || product.stock < item.quantity) throw Object.assign(new Error(`${item.name || 'Product'} is unavailable`), { status: 400 })
    return { product: product._id, name: product.name, image: product.images[0], price: product.price, quantity: item.quantity }
  })
  const total = normalizedItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const order = await Order.create({ user: req.user._id, items: normalizedItems, shippingAddress, paymentMethod, total })
  await Promise.all(normalizedItems.map((item) => Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } })))
  res.status(201).json(order)
}

export const getMyOrders = async (req, res) => res.json(await Order.find({ user: req.user._id }).sort({ createdAt: -1 }))
export const getOrder = async (req, res) => {
  const order = await Order.findOne({ _id: req.params.id, user: req.user._id })
  if (!order) return res.status(404).json({ message: 'Order not found' })
  res.json(order)
}

export const createPaymentIntent = async (req, res) => {
  if (!process.env.STRIPE_KEY || process.env.STRIPE_KEY.includes('replace')) return res.status(503).json({ message: 'Stripe is not configured' })
  const stripe = new Stripe(process.env.STRIPE_KEY)
  const intent = await stripe.paymentIntents.create({ amount: Math.round(Number(req.body.amount) * 100), currency: 'usd', automatic_payment_methods: { enabled: true } })
  res.json({ clientSecret: intent.client_secret })
}
