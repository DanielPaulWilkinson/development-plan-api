import express from 'express';
import controller from '../controllers/User';
import VerifyToken from '../middleware/auth';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/register', ValidateSchema(Schemas.user.register), controller.Register);
router.post('/login', ValidateSchema(Schemas.user.login), controller.Login);

export = router;
