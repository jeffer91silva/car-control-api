const express = require('express');
const router = express.Router();
const controller = require('../controllers/utilizacoesController');

router.post('/', controller.create);
router.post('/:id/finalizar', controller.finish);
router.get('/', controller.list);

module.exports = router;
