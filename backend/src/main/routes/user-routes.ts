import { Router } from 'express'
import { adapRoute } from '../adapters/express-routes-adapter'

const userRouter = Router()
userRouter.post('/')

export { userRouter }
