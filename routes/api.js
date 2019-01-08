const apiRouter = require('express').Router();
const authorsRouter = require('./authors');
const jokesRouter = require('./jokes');

apiRouter.use('/authors', authorsRouter);
apiRouter.use('/jokes', jokesRouter);

module.exports = { apiRouter };
