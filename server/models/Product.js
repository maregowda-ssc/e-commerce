import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  category: { type: String, required: true, index: true },
  images: [{ type: String }],
  stock: { type: Number, default: 0, min: 0 },
  featured: { type: Boolean, default: false },
  rating: { type: Number, default: 4.8 },
  reviewCount: { type: Number, default: 0 }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
