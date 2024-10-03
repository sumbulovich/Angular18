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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUserPlace = exports.addUserPlace = exports.getUserPlaces = exports.getPlaces = void 0;
const promises_1 = __importDefault(require("node:fs/promises"));
const getPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield new Promise((resolve) => setTimeout(resolve, 1000));
    const fileContent = yield promises_1.default.readFile("./data/places.json");
    const placesData = JSON.parse(fileContent.toString());
    res.status(200).json({ places: placesData });
});
exports.getPlaces = getPlaces;
const getUserPlaces = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileContent = yield promises_1.default.readFile("./data/user-places.json");
    const places = JSON.parse(fileContent.toString());
    res.status(200).json({ places });
});
exports.getUserPlaces = getUserPlaces;
const addUserPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const placeId = req.body.placeId;
    const fileContent = yield promises_1.default.readFile("./data/places.json");
    const placesData = JSON.parse(fileContent.toString());
    const place = placesData.find((place) => place.id === placeId);
    const userPlacesFileContent = yield promises_1.default.readFile("./data/user-places.json");
    const userPlacesData = JSON.parse(userPlacesFileContent.toString());
    let updatedUserPlaces = userPlacesData;
    if (!userPlacesData.some((p) => p.id === place.id)) {
        updatedUserPlaces = [...userPlacesData, place];
    }
    yield promises_1.default.writeFile("./data/user-places.json", JSON.stringify(updatedUserPlaces));
    res.status(200).json({ userPlaces: updatedUserPlaces });
});
exports.addUserPlace = addUserPlace;
const deleteUserPlace = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userPlacesFileContent = yield promises_1.default.readFile("./data/user-places.json");
    const userPlacesData = JSON.parse(userPlacesFileContent.toString());
    const placeIndex = userPlacesData.findIndex((place) => place.id.toString() === req.params['id']);
    let updatedUserPlaces = userPlacesData;
    if (placeIndex >= 0) {
        updatedUserPlaces.splice(placeIndex, 1);
    }
    yield promises_1.default.writeFile("./data/user-places.json", JSON.stringify(updatedUserPlaces));
    res.status(200).json({ userPlaces: updatedUserPlaces });
});
exports.deleteUserPlace = deleteUserPlace;
