"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketModel = void 0;
const mongoose_1 = require("mongoose");
const ticketSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    request: { type: String, required: true },
    status: { type: String, required: true },
    image: { type: String },
});
exports.TicketModel = (0, mongoose_1.model)('Ticket', ticketSchema);
