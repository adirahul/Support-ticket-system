import express from 'express';
import cors from "cors"
import dotenv from "dotenv"
import connectDB from './config/db.js';
import supportAgentRoute from './routes/supportAgentRoute.js'
import supportTicketRoute from './routes/supportTicketRoute.js'
import bodyParser from 'body-parser';
import morgan from 'morgan';



const app = express();

const PORT = process.env.PORT || 8080;

//loads env files content into process.env
dotenv.config();

//mongoDB connection
connectDB();

//middlewares
app.use(cors({origin: true, credentials: true}));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use(morgan("tiny"));


//routes
app.use("/api/support-agents", supportAgentRoute);
app.use("/api/support-tickets", supportTicketRoute);


app.listen(PORT, ()=>{
    console.log(`Server listening at ${PORT}`);
})