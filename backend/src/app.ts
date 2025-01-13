import bodyParser from "body-parser";
import express from "express";
import placesRouter from "./routes/places"
import ticketsRouter from "./routes/tickets"
import tasksRouter from "./routes/tasks"
import authRouter from "./routes/auth"
import mongoose from "mongoose";
import path from "path";
import dotenv from 'dotenv';

// Use environment variables
dotenv.config({ path: '.env.local' });

const app = express();

// Serve static files from the /public directory
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/data', express.static(path.join(__dirname, '../data')));

// Connect to MongoDB
// usr: sumbulovich
// psw: process.env['MONGODB_PSW']
// DB: test
mongoose.connect(`mongodb+srv://sumbulovich:${process.env['MONGODB_PSW']}@cluster0.rqulk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0`)
  .then(() => console.log('Connected to testDB database'))
  .catch(() => console.log('Connected failed'));

app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-DEBUG, Authorization");

  next();
});

app.use('/api/places', placesRouter);
app.use('/api/tickets', ticketsRouter);
app.use('/api/tasks', tasksRouter);
app.use('/api/auth', authRouter);

// 404
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return next();
//   }
//   res.status(404).json({ message: "404 - Not Found" });
// });

export default app
