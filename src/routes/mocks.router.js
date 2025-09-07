import {Router} from 'express';
import mockController from '../controllers/mock.controller.js'

const router = Router();
router.get('/mockingpets',mockController.createMocksPets);
router.get('/mockingusers',mockController.createMocksUsers);
router.post('/generateData',mockController.generateData);




// router.post('/',petsController.createPet);
// router.post('/withimage',uploader.single('image'), petsController.createPetWithImage);
// router.put('/:pid',petsController.updatePet);
// router.delete('/:pid',petsController.deletePet);

export default router;