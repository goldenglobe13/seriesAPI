const express = require('express');
const serverless = require('serverless-http');
const seriesController = require('../controllers/seriesController');

const router = express.Router();

// router.param('id', tourController.checkID);

// router
//   .route('/top-5-cheap')
//   .get(tourController.aliasTopTour, tourController.getAllTours);

router
  .route('/')
  .get(seriesController.middlewareSelect, seriesController.getAllSeries);
router
  .route('/whatIsYear')
  .get(seriesController.middlewareSelect, seriesController.whatIsYear);
// .post(tourController.createTour);

// router
//   .route('/:id')
//   .get(tourController.getTour)
//   .patch(tourController.updateTour)
//   .delete(tourController.deleteTour);

module.exports = router;
