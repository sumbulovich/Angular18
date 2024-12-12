import { Request, Response } from "express";
import fs from "node:fs/promises";
import { Place } from "../models/place";
import path from "node:path";

const dataPath = () => path.join(__dirname, '../../data')

// Copy file in a writable temporary location
// The server's filesystem is read-only, except for the /tmp directory
fs.copyFile(`${dataPath()}/user-places.json`, '/tmp/user-places.json');

export const getPlaces = async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const fileContent = await fs.readFile(`${dataPath()}/places.json`);
  const placesData = JSON.parse(fileContent.toString());

  res.status(200).json({ places: placesData });
}

export const getUserPlaces = async (req: Request, res: Response) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const fileContent = await fs.readFile(`${dataPath()}/user-places.json`);
  const placesData = JSON.parse(fileContent.toString());

  res.status(200).json({ places: placesData });
}

export const addUserPlace = async (req: Request, res: Response) => {
  const fileContent = await fs.readFile(`${dataPath()}/places.json`);
  const placesData = JSON.parse(fileContent.toString());

  const fileContent2 = await fs.readFile(`/tmp/user-places.json`);
  const userPlacesData = JSON.parse(fileContent2.toString());

  const place = placesData.find((place: Place) => place.id === req.body.placeId);

  let updatedUserPlaces = userPlacesData;
  if (!userPlacesData.some((p: Place) => p.id === place.id)) {
    updatedUserPlaces = [...userPlacesData, place];
  }

  await fs.writeFile(
    `/tmp/user-places.json`,
    JSON.stringify(updatedUserPlaces),
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
}

export const deleteUserPlace = async (req: Request, res: Response) => {
  const userPlacesFileContent = await fs.readFile(`/tmp/user-places.json`);
  const userPlacesData = JSON.parse(userPlacesFileContent.toString());

  const updatedUserPlaces = userPlacesData.filter((place: Place) => place.id.toString() !== req.params['id']);

  await fs.writeFile(
    `/tmp/user-places.json`,
    JSON.stringify(updatedUserPlaces)
  );

  res.status(200).json({ userPlaces: updatedUserPlaces });
}
