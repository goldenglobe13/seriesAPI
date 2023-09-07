const Series = require('./../models/seriesModel');
const APIFeatures = require('./../utils/apiFeatures');

// exports.aliasTopTour = (req, res, next) => {
//   req.query.limit = '5';
//   req.query.sort = '-ratingsAverage,price';
//   req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
//   next();
// };
const arrayRange = (start, stop, step) =>
  Array.from(
    { length: (stop - start) / step + 1 },
    (value, index) => start + index * step,
  );

function getRandom(arr, n) {
  let result = new Array(n);
  let len = arr.length;
  let taken = new Array(len);
  if (n > len)
    throw new RangeError('getRandom: more elements taken than available');
  while (n--) {
    let x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
}

exports.middlewareSelect = (req, res, next) => {
  req.query.sort = '-rating';
  req.query.fields = 'title,rating,seasons,epsCount,year';
  next();
};

exports.getAllSeries = async (req, res) => {
  try {
    // BUILD QUERY
    // 2) Sorting
    // 3) Field limiting
    // 4) Pagination
    // EXECUTE QUERY
    const features = new APIFeatures(Series.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const series = await features.query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: series.length,
      data: { series },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.whatIsYear = async (req, res) => {
  try {
    const query = Series.aggregate([{ $sample: { size: 1 } }]);
    const series = await query;
    // console.log(series);

    const indexOfSeries = Math.floor(
      series.length * Math.random() !== series.length
        ? series.length * Math.random()
        : series.length - 1,
    );

    // console.log(indexOfSeries);
    // console.log(series[indexOfSeries]);

    const ans = series[indexOfSeries].year;
    console.log(ans);

    const rng = getRandom([2, 3, 4], 1)[0];
    console.log(rng);

    const arrayOfPossibleOptions =
      ans !== 2023
        ? arrayRange(ans - rng, ans + rng, 1).filter((item, i) => i !== rng)
        : arrayRange(ans - 2 * rng, ans - 1, 1);

    console.log(arrayOfPossibleOptions);

    const ops = getRandom(arrayOfPossibleOptions, 3);
    const opsIndex = getRandom([1, 2, 3, 4], 4);
    // console.log(opsIndex);
    let options = [ans, ...ops];
    // console.log(options);
    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      result: series.length,
      data: {
        question: `In which year was the TV series ${series[indexOfSeries].title} first aired:`,
        options: options,
        opsIndex: opsIndex,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: `${err}`,
    });
  }
};

// exports.getSeries = async (req, res) => {
//   try {
//     const series = await Series.findById(req.params.id);
//     // const series = await Series.findOne({ _id: req.params.id });
//     res.status(200).json({
//       status: 'success',
//       data: { series },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: err,
//     });
//   }
// };

// exports.createSeries = async (req, res) => {
//   try {
//     const newSeries = await Series.create(req.body);
//     res.status(201).json({
//       status: 'success',
//       data: {
//         series: newSeries,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid data sent',
//     });
//   }
// };

// exports.updateSeries = async (req, res) => {
//   try {
//     const series = await Series.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     res.status(200).json({
//       status: 'success',
//       data: {
//         series,
//       },
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid data sent',
//     });
//   }
// };

// exports.deleteSeries = async (req, res) => {
//   try {
//     await Series.findByIdAndDelete(req.params.id);
//     res.status(204).json({
//       status: 'success',
//       data: null,
//     });
//   } catch (err) {
//     res.status(404).json({
//       status: 'fail',
//       message: 'Invalid data sent',
//     });
//   }
// };
