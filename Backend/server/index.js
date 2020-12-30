import path from 'path'
import express  from 'express'
import dotenv from 'dotenv'
import bodypParser from 'body-parser'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import signUpRouter from './routes/auth/signUp/index.js'
import signInrouter from './routes/auth/signIn/index.js'
import signOutRouter from './routes/auth/signOut/index.js'
import ExpressValidator from 'express-validator'
import authorizer from './helpers/authorizers/index.js'
import userRouter from './routes/users/index.js'
import uploadRouter from './routes/upload/index.js'

const __dirname = path.resolve() // why __dirname is not working 
dotenv.config({path:path.resolve(__dirname , '.env')}) 
const port  = process.env.PORT

const app = express()

app.use(express.static(__dirname + '/public')); //Serves resources from public folder
console.log(__dirname + '/public')

//third party middlwares 
app.use(bodypParser.json())
app.use(cookieParser())

app.use(morgan('dev'))

//to allow Cross origin requests!
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST")
  next()
})

app.use(ExpressValidator())  //validations of input by user , for example email validations and non-empty password validationss
app.use(signUpRouter)
app.use(signInrouter)
app.use(signOutRouter)
app.use(userRouter)
app.use(uploadRouter)

app.get('/hello',authorizer(),(req,res)=>{
    res.send("hello")
})


app.listen(port, ()=> console.log("listenig at" + port))