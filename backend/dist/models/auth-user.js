"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserModel = void 0;
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const authUserSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    permission: { type: String, required: true },
    name: { type: String, required: true },
    lastName: { type: String, required: true },
});
authUserSchema.plugin(mongoose_unique_validator_1.default);
exports.AuthUserModel = (0, mongoose_1.model)('AuthUser', authUserSchema);
