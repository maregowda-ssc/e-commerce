import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, name: String, image: String, price: Number, quantity: Number }],
  shippingAddress: { fullName: String, address: String, city: String, postalCode: String, country: String },
  paymentMethod: { type: String, default: 'card' },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  orderStatus: { type: String, enum: ['processing', 'shipped', 'delivered', 'cancelled'], default: 'processing' },
  total: { type: Number, required: true },
  stripePaymentIntentId: String
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)
