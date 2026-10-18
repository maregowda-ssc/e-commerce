
import ProductRequest from '../models/ProductRequest.js'
import Product from '../models/Product.js'

// Seller submits a product for approval
export const submitRequest = async (req, res) => {
  try {
    const { name, description, price, category, images, stock } = req.body

    if (!name || !description || price === undefined || !category) {
      return res.status(400).json({
        message: 'Name, description, price, and category are required'
      })
    }

    const request = await ProductRequest.create({
      seller: req.user._id,
      name,
      description,
      price: Number(price),
      category,
      images: Array.isArray(images) ? images : [],
      stock: Number(stock ?? 0)
    })

    res.status(201).json({
      message: 'Product request submitted successfully',
      request
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Seller views their own requests
export const getMyRequests = async (req, res) => {
  const requests = await ProductRequest.find({ seller: req.user._id })
    .sort({ createdAt: -1 })

  res.json(requests)
}

// Admin views all requests
export const getAllRequests = async (req, res) => {
  const requests = await ProductRequest.find()
    .populate('seller', 'name email')
    .sort({ createdAt: -1 })

  res.json(requests)
}

// Admin approves a request and publishes the product
export const approveRequest = async (req, res) => {
  const request = await ProductRequest.findOneAndUpdate(
    { _id: req.params.id, status: 'Pending' },
    {
      status: 'Approved',
      reviewedBy: req.user._id,
      reviewedAt: new Date()
    },
    { new: true }
  )

  if (!request) {
    return res.status(404).json({
      message: 'Pending product request not found'
    })
  }

  try {
    const product = await Product.create({
      name: request.name,
      description: request.description,
      price: request.price,
      category: request.category,
      images: request.images,
      stock: request.stock
    })

    res.json({
      message: 'Product approved and published',
      product
    })
  } catch (error) {
    // Restore Pending status if product creation fails
    request.status = 'Pending'
    request.reviewedBy = null
    request.reviewedAt = null
    await request.save()

    res.status(400).json({ message: error.message })
  }
}

// Admin rejects a request
export const rejectRequest = async (req, res) => {
  const { reason } = req.body

  const request = await ProductRequest.findOneAndUpdate(
    { _id: req.params.id, status: 'Pending' },
    {
      status: 'Rejected',
      rejectionReason: reason || '',
      reviewedBy: req.user._id,
      reviewedAt: new Date()
    },
    { new: true }
  )

  if (!request) {
    return res.status(404).json({
      message: 'Pending product request not found'
    })
  }

  res.json({ message: 'Product request rejected', request })
}
