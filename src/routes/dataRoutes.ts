import { Router } from 'express';
import { getData } from '../controllers/dataController';

const router = Router();

router.get('/data/:chartType', getData);

export default router;
