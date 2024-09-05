import express from "express";
import fs from "node:fs/promises";
import { Place } from "../models/place";

const router = express.Router(); // Create Express Router

router.get("/", async (req, res) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Throw error
  // return res.status(500).json();

  const fileContent = await fs.readFile("./data/places.json");
  const placesData = JSON.parse(fileContent.toString());

  res.status(200).json({ places: placesData });
});

router.get("/user-places", async (req, res) => {
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent.toString());

  res.status(200).json({ places });
});

router.put("/user-places", async (req, res) => {
  const placeId = req.body.placeId;

  const fileContent = await fs.readFile("./data/places.json");
  const placesData = JSON.parse(fileContent.toString());

  const place = placesData.find((place: Place) => place.id === placeId);

  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent.toString());

  let updatedUserPlaces = userPlacesData;

  if (!userPlacesData.some((p: Place) => p.id === place.id)) {
    updatedUserPlaces = [...userPlacesData, place];
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
});

router.delete("/user-places/:id", async (req, res) => {
  const placeId = req.params.id;

  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent.toString());

  const placeIndex = userPlacesData.findIndex((place: Place) => place.id.toString() === placeId);

  let updatedUserPlaces = userPlacesData;

  if (placeIndex >= 0) {
    updatedUserPlaces.splice(placeIndex, 1);
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
});

export default router;
