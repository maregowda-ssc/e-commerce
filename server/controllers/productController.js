import Product from '../models/Product.js'

export const getProducts = async (req, res) => {
  const { category, search, min, max, featured } = req.query
  const query = {}
  if (category && category !== 'All') query.category = category
  if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: search, $options: 'i' } }]
  if (min || max) query.price = { ...(min && { $gte: Number(min) }), ...(max && { $lte: Number(max) }) }
  if (featured === 'true') query.featured = true
  res.json(await Product.find(query).sort({ featured: -1, createdAt: -1 }))
}

export const getProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
}

export const createProduct = async (req, res) => {
  const images = req.files?.map((file) => `/uploads/${file.filename}`) || req.body.images || []
  res.status(201).json(await Product.create({ ...req.body, images }))
}

export const updateProduct = async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json(product)
}

export const deleteProduct = async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id)
  if (!product) return res.status(404).json({ message: 'Product not found' })
  res.json({ message: 'Product deleted' })
}
