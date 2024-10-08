"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const places_1 = __importDefault(require("./routes/places"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
// Serve static files from the /public directory
app.use('/public', express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/data', express_1.default.static(path_1.default.join(__dirname, '../data')));
// usr: sumbulovich
// psw: XsOK5tjiV58UrwSi
// DB: test
mongoose_1.default.connect("mongodb+srv://sumbulovich:XsOK5tjiV58UrwSi@cluster0.rqulk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to testDB database'))
    .catch(() => console.log('Connected failed'));
app.use(body_parser_1.default.json());
// CORS
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-DEBUG, Authorization");
    next();
});
app.use('/api/places', places_1.default);
app.use('/api/tickets', tickets_1.default);
app.use('/api/tasks', tasks_1.default);
app.use('/api/auth', auth_1.default);
// 404
// app.use((req, res, next) => {
//   if (req.method === "OPTIONS") {
//     return next();
//   }
//   res.status(404).json({ message: "404 - Not Found" });
// });
exports.default = app;
