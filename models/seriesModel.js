const mongoose = require('mongoose');

const seriesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'A series must have a title'],
    unique: true,
    trim: true,
  },
  epsCount: {
    type: Number,
    required: [true, 'A series must have a episodes count'],
  },
  seasons: {
    type: Number,
    required: [true, 'A series must have a number seasons'],
  },
  rating: {
    type: Number,
    required: [true, 'A series must have a ratings average'],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  popularity: {
    type: Number,
  },
  casts: [{}],
  creators: [{}],
  createdAt: {
    type: Date,
    default: Date.now(),
    // select: false,
  },
  year: Number,
});

const Series = mongoose.model('Series', seriesSchema);

module.exports = Series;

// const testTour = new Tour({
//   name: 'The Park Camper',
// });

// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log('ERROR:', err);
//   });
