"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicket = exports.editTicket = exports.createTicket = exports.getTicket = exports.getTickets = void 0;
const ticket_1 = require("../models/ticket");
const fs_1 = require("fs");
let pE;
/**
 * Get paginated tickets
 * @returns tickets
 */
function getPaginatedTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        pE.length = yield ticket_1.TicketModel.countDocuments();
        if (!pE.pageSize)
            return ticket_1.TicketModel.find();
        return ticket_1.TicketModel.find().sort({ _id: -1 }).skip(pE.pageSize * pE.pageIndex).limit(pE.pageSize);
    });
}
const getTickets = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    pE = {
        pageSize: +(req.query.pageSize || 0),
        pageIndex: +(req.query.pageIndex || 0),
        length: +(req.query.length || 0)
    };
    const tickets = yield getPaginatedTickets();
    res.status(200).json({ tickets, pageEvent: pE });
});
exports.getTickets = getTickets;
const getTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const ticket = yield ticket_1.TicketModel.findOne({ _id: req.params.id });
    if (ticket) {
        res.status(200).json(ticket);
    }
    else {
        res.status(400).json({ message: 'Not found' });
    }
});
exports.getTicket = getTicket;
const createTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = req.file ? `${req.protocol}://${req.get('host')}/public/tickets/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}` : '';
    const ticket = new ticket_1.TicketModel(Object.assign(Object.assign({}, req.body), { image }));
    yield ticket.save(); // await TicketModel.create(ticket)
    const tickets = yield getPaginatedTickets();
    // pE.pageIndex = Math.floor(pE.length / pE.pageSize); // Set last page
    // if (!(pE.length % pE.pageSize)) pE.pageIndex -= 1; // Set previous page if no elements on current page
    pE.pageIndex = 0; // Set first page
    res.status(200).json({ tickets, pageEvent: pE });
});
exports.createTicket = createTicket;
const editTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const image = req.file ? `${req.protocol}://${req.get('host')}/public/tickets/${(_a = req.file) === null || _a === void 0 ? void 0 : _a.filename}` : '';
    const ticket = yield ticket_1.TicketModel.findOneAndUpdate({ _id: req.body._id }, Object.assign(Object.assign({}, req.body), { image }));
    if (ticket) {
        if (ticket.image)
            (0, fs_1.unlinkSync)(ticket.image.replace(`${req.protocol}://${req.get('host')}`, '.')); // delete previous image
        const tickets = yield getPaginatedTickets();
        res.status(200).json({ tickets, pageEvent: pE });
    }
    else {
        res.status(400).json({ message: 'Not found' });
    }
});
exports.editTicket = editTicket;
const deleteTicket = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield ticket_1.TicketModel.deleteOne({ _id: req.params.id });
    if (response.deletedCount) {
        const tickets = yield getPaginatedTickets();
        if (!(pE.length % pE.pageSize))
            pE.pageIndex -= 1; // Set previous page if no elements on current page
        res.status(200).json({ tickets, pageEvent: pE });
    }
    else {
        res.status(400).json({ message: 'Not found' });
    }
});
exports.deleteTicket = deleteTicket;
