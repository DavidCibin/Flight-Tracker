const express = require('express');
const router = express.Router();

const flightCtrl = require('../controllers/flights')

router.get('/', flightCtrl.index);
router.get('/sort', flightCtrl.sortDepart)
router.get('/new', flightCtrl.new);
router.get('/:id', flightCtrl.show)
router.post('/', flightCtrl.create);
router.post('/:id', flightCtrl.createTicket)
router.post('/:id/destinations', flightCtrl.addDest)
router.put('/:id/:did', flightCtrl.delDest)
router.delete('/:id/:tid', flightCtrl.delTicket)
router.delete('/:id', flightCtrl.delFlight)

module.exports = router;