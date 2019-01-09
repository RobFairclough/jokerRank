const apiRouter = require('express').Router();
const authorsRouter = require('./authors');
const jokesRouter = require('./jokes');
const reportRouter = require('./report');

apiRouter.use('/authors', authorsRouter);
apiRouter.use('/jokes', jokesRouter);
apiRouter.use('/report', reportRouter);

module.exports = { apiRouter };
