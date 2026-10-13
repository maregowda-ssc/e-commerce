import { Router } from 'express'
import multer from 'multer'
import { admin, protect } from '../middleware/auth.js'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/productController.js'

const upload = multer({ dest: 'uploads/' })
const router = Router()
router.get('/', getProducts)
router.get('/:id', getProduct)
router.post('/', protect, admin, upload.array('images', 6), createProduct)
router.put('/:id', protect, admin, updateProduct)
router.delete('/:id', protect, admin, deleteProduct)
export default router
