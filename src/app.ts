import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRoute from './app/modules/users/users.route'
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
app.get('/', async (req: Request, res: Response) => {
  res.send('Working connect')
})

export default app
