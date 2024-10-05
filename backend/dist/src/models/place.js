"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceModel = void 0;
const mongoose_1 = require("mongoose");
const imageSchema = new mongoose_1.Schema({
    src: { type: String, required: true },
    alt: { type: String, required: true }
});
const placeSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    image: { type: imageSchema, required: true },
    lat: { type: Number, required: true },
    lon: { type: Number, required: true },
});
exports.PlaceModel = (0, mongoose_1.model)('Place', placeSchema);
