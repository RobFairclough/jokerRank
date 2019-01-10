const { fileReport } = require('../models/report');

const sendReport = (req, res, next) => {
  const { report } = req.body;
  fileReport(report, (err, reported) => {
    if (err) next(err);
    else res.render('pages/report.ejs', { sent: true });
  });
};

module.exports = { sendReport };
