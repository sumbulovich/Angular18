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
exports.checkAuth = checkAuth;
exports.checkAdmin = checkAdmin;
const jsonwebtoken_1 = require("jsonwebtoken");
function checkAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.header('Authorization')) === null || _a === void 0 ? void 0 : _a.replace('Bearer ', '');
            if (!token)
                throw new Error('No token');
            // Decode token and store it for next middleware
            res.locals.decodedToken = (0, jsonwebtoken_1.verify)(token, process.env['JTW_SECRET_KEY']);
            next();
        }
        catch (err) {
            const isExpired = err instanceof jsonwebtoken_1.TokenExpiredError;
            res.status(401).send({ message: isExpired ? 'Token expired' : 'Auth failed' });
        }
    });
}
;
function checkAdmin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const permission = res.locals.decodedToken.permission;
        if (permission === 'admin')
            next();
        else
            res.status(403).send({ message: 'Unauthorized role' });
    });
}
;
