"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractFile = void 0;
const multer_1 = __importDefault(require("multer"));
const MINE_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        let error = null;
        if (!MINE_TYPE[file.mimetype])
            error = new Error('Invalid mine type');
        cb(error, './public/tickets');
    },
    filename: (req, file, cb) => {
        const ext = MINE_TYPE[file.mimetype];
        cb(null, `${Date.now()}.${ext}`);
    }
});
exports.extractFile = (0, multer_1.default)({ storage }).single('file');
