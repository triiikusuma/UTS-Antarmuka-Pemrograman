const express = require('express');
const router = express.Router();
const sistem_booking_hotel = require('../services/sistem_booking_hotel');

/* GET pemesanan. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await sistem_booking_hotel.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting pemesanan `, err.message);
    next(err);
  }
});

/* POST pemesanan */
router.post('/', async function(req, res, next) {
  try {
    const result = await sistem_booking_hotel.create(req.body); // Menggunakan fungsi create dari sistem_booking_hotel
    res.json(result);
  } catch (err) {
    console.error(`Error while creating pemesanan: `, err.message);
    next(err);
  }
});

/* PUT pemesanan */
router.put('/:id', async function(req, res, next) {
  try {
    const result = await sistem_booking_hotel.update(req.params.id, req.body); // Menggunakan fungsi update dari sistem_booking_hotel
    res.json(result);
  } catch (err) {
    console.error(`Error while updating pemesanan: `, err.message);
    next(err);
  }
});

/* DELETE pemesanan */
router.delete('/:id', async function(req, res, next) {
  try {
    const result = await sistem_booking_hotel.remove(req.params.id); // Menggunakan fungsi remove dari sistem_booking_hotel
    res.json(result);
  } catch (err) {
    console.error(`Error while deleting pemesanan: `, err.message);
    next(err);
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const result = await sistem_booking_hotel.search(req.params.id); // Menggunakan fungsi search dari sistem_booking_hotel
    res.json(result);
  } catch (err) {
    console.error(`Error while searching pemesanan `, err.message);
    next(err);
  }
});


module.exports = router;