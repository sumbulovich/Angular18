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
exports.editProfile = exports.getProfile = exports.login = exports.signup = void 0;
const bcrypt_1 = require("bcrypt");
const auth_user_1 = require("../models/auth-user");
const jsonwebtoken_1 = require("jsonwebtoken");
const signup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const password = yield (0, bcrypt_1.hash)(req.body.password, 10);
    const user = new auth_user_1.AuthUserModel(Object.assign(Object.assign({}, req.body), { password }));
    user.save()
        .then(() => res.status(200).json({ message: 'User registered' }))
        .catch((err) => res.status(500).json(err));
});
exports.signup = signup;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_user_1.AuthUserModel.findOne({ email: req.body.email });
    if (!user)
        return res.status(400).json({ message: 'Not found' });
    const isAuth = yield (0, bcrypt_1.compare)(req.body.password, user.password);
    if (!isAuth)
        return res.status(401).json({ message: 'Incorrect email or password' });
    const expirationMs = 3600000; // 1h
    const { _id, name, lastName, email, permission } = user;
    const token = (0, jsonwebtoken_1.sign)({ _id, permission }, process.env['JTW_SECRET_KEY'], { expiresIn: expirationMs / 1000 });
    res.status(200).json({ _id, name, lastName, email, permission, token, expiration: expirationMs });
});
exports.login = login;
const getProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get AuthUser's _id from decodedToken from the middleware
    const user = yield auth_user_1.AuthUserModel.findOne({ _id: res.locals.decodedToken._id });
    if (!user)
        return res.status(400).json({ message: 'Not found' });
    const { _id, name, lastName, email, permission } = user;
    res.status(200).json({ _id, name, lastName, email, permission });
});
exports.getProfile = getProfile;
const editProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get AuthUser's _id from decodedToken from the middleware
    const user = yield auth_user_1.AuthUserModel.findOneAndUpdate({ _id: res.locals.decodedToken._id }, req.body);
    if (!user)
        return res.status(400).json({ message: 'Not found' });
    res.status(200).json();
});
exports.editProfile = editProfile;
