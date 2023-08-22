import express, { Application } from 'express'
import cors from 'cors'
import usersRoute from './app/modules/users/users.route'
import globalErrorHandler from './app/middlewares/globalErrorHandler'
// import usersService from './app/modules/users/users.service'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Application routes
console.log(app.get('env'))
app.use('/api/v1/users/', usersRoute)

//Testing
// app.get('/', (req: Request, res: Response) => {
//   throw new Error('tor error aise ')
// })

//global error handler
app.use(globalErrorHandler)

export default app
