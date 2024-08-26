import express from "express";
import { TicketModel } from "../models/ticket";

const router = express.Router(); // Create Express Router

router.get("/tickets", async (req, res) => {
  // const fileContent = await fs.readFile("./data/tickets.json");
  // const tickets = JSON.parse(fileContent.toString());

  const tickets = await TicketModel.find();
  res.status(200).json({ tickets });
});

router.post("/tickets", async (req, res) => {
  const ticket = new TicketModel({
    title: req.body.title,
    request: req.body.request,
    status: req.body.status
  })

  // const fileContent = await fs.readFile("./data/tickets.json");
  // const ticketsData: Ticket[] = JSON.parse(fileContent.toString());
  // const updatedTickets = [...ticketsData, ticket];
  // await fs.writeFile("./data/tickets.json", JSON.stringify(updatedTickets));

  await ticket.save(); // await TicketModel.create(ticket)

  const updatedTickets = await TicketModel.find();
  res.status(200).json({ tickets: updatedTickets });
});

router.put("/tickets", async (req, res) => {
  const ticketId = req.body._id;
  const task = req.body;

  // const fileContent = await fs.readFile("./data/tickets.json");
  // const ticketsData: Ticket[] = JSON.parse(fileContent.toString());
  // const updatedTickets = ticketsData.map((m) => m.id === task.id ? task : m);
  // await fs.writeFile("./data/tickets.json",  JSON.stringify(updatedTickets));

  await TicketModel.findOneAndUpdate({ _id: ticketId }, task)

  const updatedTickets = await TicketModel.find();
  res.status(200).json({ tickets: updatedTickets });
});

router.delete("/tickets/:id", async (req, res) => {
  const ticketId = req.params.id;

  // const fileContent = await fs.readFile("./data/tickets.json");
  // const tickets = JSON.parse(fileContent.toString());
  // const placeIndex = tickets.findIndex((ticket: Ticket) => ticket.id.toString() === ticketId);
  // let updatedTickets = tickets;
  // if (placeIndex >= 0)  updatedTickets.splice(placeIndex, 1);
  // await fs.writeFile("./data/tickets.json", JSON.stringify(updatedTickets));

  await TicketModel.deleteOne({ _id: ticketId })

  const updatedTickets = await TicketModel.find();
  res.status(200).json({ tickets: updatedTickets });
});

export default router;
 