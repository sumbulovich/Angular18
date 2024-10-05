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
exports.deleteTask = exports.getUserTasks = exports.editTaskStatus = exports.editTask = exports.createTasks = exports.getTasks = void 0;
const task_1 = require("../models/task");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.TaskModel.find();
    res.status(200).json(tasks);
});
exports.getTasks = getTasks;
const createTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get AuthUser's _id from decodedToken from the middleware
    const creator = res.locals.decodedToken._id;
    const task = new task_1.TaskModel(Object.assign(Object.assign({}, req.body), { creator }));
    yield task.save(); // await TaskModel.create(task)
    res.status(200).json(task);
});
exports.createTasks = createTasks;
const editTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get AuthUser's _id from decodedToken from the middleware
    const creator = res.locals.decodedToken._id;
    const task = yield task_1.TaskModel.findOneAndUpdate({ _id: req.body._id, creator }, req.body);
    if (task)
        res.status(403).json({ message: 'Unauthorized creator' });
    else
        res.status(200).json();
});
exports.editTask = editTask;
const editTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const task = yield task_1.TaskModel.findOneAndUpdate({ _id: req.params.id }, req.body);
    if (task)
        res.status(200).json();
    else
        res.status(400).json({ message: 'Not found' });
});
exports.editTaskStatus = editTaskStatus;
const getUserTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tasks = yield task_1.TaskModel.find({ userId: req.params.userId });
    if (tasks)
        res.status(200).json(tasks);
    else
        res.status(400).json({ message: 'Not found' });
});
exports.getUserTasks = getUserTasks;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get AuthUser's _id from decodedToken from the middleware
    const creator = res.locals.decodedToken._id;
    const response = yield task_1.TaskModel.deleteOne({ _id: req.params.id, creator });
    if (response.deletedCount)
        res.status(200).json();
    else
        res.status(403).json({ message: 'Unauthorized creator' });
});
exports.deleteTask = deleteTask;
