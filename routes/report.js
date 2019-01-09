const reportRouter = require('express').Router();

const { sendReport } = require('../controllers/report');

reportRouter.post('/', sendReport);

module.exports = reportRouter;
