
import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config()
import { UserRouter } from './routes/user.js'
import {patientRoutes} from './routes/patient.js'
import {OrthoRoutes} from './routes/orthophoniste.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // Autoriser les requêtes depuis ce domaine
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE"); // Méthodes HTTP autorisées
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"); // En-têtes autorisés
    next();
  });

app.use(cookieParser())
app.use('/auth', UserRouter)
app.use('/orthophonistes', OrthoRoutes)
app.use('/patient', patientRoutes)

mongoose.connect('mongodb+srv://nourhenejamaoui262001:Nour26@cluster0.skd2tpe.mongodb.net/authentication?retryWrites=true&w=majority')
.then( () => {
    console.info("Connected to the DB");
})
.catch( (e) => {
    console.log("Error:" ,e);
});

app.listen(3000 , () => {
    console.log("Server is Runing on port 3000 hmdlh ^-^")
})