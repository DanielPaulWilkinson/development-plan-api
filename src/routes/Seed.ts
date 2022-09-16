import express from 'express';
import controller from '../controllers/Seed';
import auth from '../middleware/auth';

const router = express.Router();

router.post('/all', auth.VerifyToken, controller.SeedData);

export = router;
