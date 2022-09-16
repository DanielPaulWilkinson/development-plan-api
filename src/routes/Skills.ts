import express from 'express';
import controller from '../controllers/Skills';
import auth from '../middleware/auth';
import { Schemas, ValidateSchema } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.skill.create), auth.VerifyToken, controller.CreateSkill);
router.get('/get/:skillId', ValidateSchema(Schemas.skill.get), auth.VerifyToken, controller.GetSkill);
router.get('/get', ValidateSchema(Schemas.skill.all), auth.VerifyToken, controller.GetAllSkills);
router.patch('/update/:skillId', ValidateSchema(Schemas.skill.update), auth.VerifyToken, controller.UpdateSkill);
router.delete('/delete/:skillId', ValidateSchema(Schemas.skill.delete), auth.VerifyToken, controller.DeleteSkill);
router.get('get/skills/:categoryId', ValidateSchema(Schemas.skill.categorySkills), auth.VerifyToken, controller.GetSkillsForCategoryId);

export = router;
