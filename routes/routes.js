import express from 'express';
import createCard from '../controller/createCard.js';

const router = express.Router();

router.get('/api', (req, res) => {
  res.send('Hello World');
});
router.post('/api/createCard', createCard);

export default router;
