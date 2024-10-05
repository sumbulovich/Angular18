"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskModel = void 0;
const mongoose_1 = require("mongoose");
const auth_user_1 = require("./auth-user");
const taskSchema = new mongoose_1.Schema({
    userId: { type: String, ref: auth_user_1.AuthUserModel, required: true },
    title: { type: String, required: true },
    summary: { type: String, required: true },
    dueDate: { type: Date, required: true },
    createdAt: { type: Date, required: true, default: Date.now },
    status: { type: String, required: true },
    creator: { type: String, ref: "AuthUser", required: true },
});
exports.TaskModel = (0, mongoose_1.model)('Task', taskSchema);
