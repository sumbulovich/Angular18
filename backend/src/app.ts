import bodyParser from "body-parser";
import express from "express";
import placesRouter from "./routes/places"
import ticketsRouter from "./routes/tickets"
import mongoose from "mongoose";

export const app = express();

mongoose.connect("mongodb+srv://sumbulovich:XsOK5tjiV58UrwSi@cluster0.rqulk.mongodb.net/testDB?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('Connected to testDB database'))
  .catch(() => console.log('Connected failed'));

app.use(express.static("images"));
app.use(bodyParser.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-DEBUG");

  next();
});

app.use(placesRouter);
app.use(ticketsRouter);

// 404
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }
  res.status(404).json({ message: "404 - Not Found" });
});

