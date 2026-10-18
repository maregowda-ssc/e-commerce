
import { Router } from 'express'
import { protect, admin } from '../middleware/auth.js'
import {
  submitRequest,
  getMyRequests,
  getAllRequests,
  approveRequest,
  rejectRequest
} from '../controllers/productRequestController.js'

const router = Router()

router.post('/', protect, submitRequest)
router.get('/mine', protect, getMyRequests)
router.get('/', protect, admin, getAllRequests)
router.patch('/:id/approve', protect, admin, approveRequest)
router.patch('/:id/reject', protect, admin, rejectRequest)

export default router
