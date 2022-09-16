import express from 'express';
import { Schema } from 'mongoose';
import controller from '../controllers/Categories';
import auth from '../middleware/auth';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.category.create), auth.VerifyToken, controller.CreateCategory);
router.get('/get/:categoryId', ValidateSchema(Schemas.category.get), auth.VerifyToken, controller.GetCategory);
router.get('/get', ValidateSchema(Schemas.category.all), auth.VerifyToken, controller.GetAllCategories);
router.patch('/update/:categoryId', ValidateSchema(Schemas.category.update), auth.VerifyToken, controller.UpdateCategory);
router.delete('/delete/:categoryId', ValidateSchema(Schemas.category.delete), auth.VerifyToken, controller.DeleteCategory);

export = router;
