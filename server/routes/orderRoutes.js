import { Router } from 'express'
import { createOrder, createPaymentIntent, getMyOrders, getOrder } from '../controllers/orderController.js'
import { protect } from '../middleware/auth.js'

const router = Router()
router.use(protect)
router.post('/', createOrder)
router.get('/mine', getMyOrders)
router.get('/:id', getOrder)
router.post('/payment-intent', createPaymentIntent)
export default router
