import { Request, Response } from "express";
import fs from "node:fs/promises";
import { Place } from "../models/place";

export const getPlaces = async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const fileContent = await fs.readFile("./data/places.json");
  const placesData = JSON.parse(fileContent.toString());

  res.status(200).json({ places: placesData });
}

export const getUserPlaces = async (req: Request, res: Response) => {
  const fileContent = await fs.readFile("./data/user-places.json");

  const places = JSON.parse(fileContent.toString());

  res.status(200).json({ places });
}

export const addUserPlace = async (req: Request, res: Response) => {
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
}

export const deleteUserPlace = async (req: Request, res: Response) => {
  const userPlacesFileContent = await fs.readFile("./data/user-places.json");
  const userPlacesData = JSON.parse(userPlacesFileContent.toString());

  const placeIndex = userPlacesData.findIndex((place: Place) => place.id.toString() === req.params['id']);

  let updatedUserPlaces = userPlacesData;

  if (placeIndex >= 0) {
    updatedUserPlaces.splice(placeIndex, 1);
  }

  await fs.writeFile(
    "./data/user-places.json",
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
}
