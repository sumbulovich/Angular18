import express from 'express';
import * as placesController from '../controllers/places';

const router = express.Router(); // Create Express Router

router.get('', placesController.getPlaces);
router.get('/user-places', placesController.getUserPlaces);
router.put('/user-places', placesController.addUserPlace);
router.delete('/user-places/:id', placesController.deleteUserPlace);

export default router;
