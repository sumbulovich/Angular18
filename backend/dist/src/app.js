"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const body_parser_1 = __importDefault(require("body-parser"));
const express_1 = __importDefault(require("express"));
const places_1 = __importDefault(require("./routes/places"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const auth_1 = __importDefault(require("./routes/auth"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
exports.app = (0, express_1.default)();
// usr: sumbulovich
// psw: XsOK5tjiV58UrwSi
// DB: test
mongoose_1.default.connect("mongodb+srv://sumbulovich:XsOK5tjiV58UrwSi@cluster0.rqulk.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log('Connected to testDB database'))
    .catch(() => console.log('Connected failed'));
exports.app.use('/public', express_1.default.static(path_1.default.join(__dirname, 'public')));
exports.app.use(body_parser_1.default.json());
// CORS
exports.app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow all domains
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-DEBUG, Authorization");
    next();
});
exports.app.get("/", (req, res) => res.send("Express on Vercel"));
exports.app.use('/api/places', places_1.default);
exports.app.use('/api/tickets', tickets_1.default);
exports.app.use('/api/tasks', tasks_1.default);
exports.app.use('/api/auth', auth_1.default);
// 404
exports.app.use((req, res, next) => {
    if (req.method === "OPTIONS") {
        return next();
    }
    res.status(404).json({ message: "404 - Not Found" });
});
