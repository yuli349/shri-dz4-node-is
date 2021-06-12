const { Router } = require('express');

const api = require('./controllers/api');

const apiRouter = new Router();

apiRouter.get('/settings', api.getSettings);
apiRouter.post('/settings', api.postSettings);
apiRouter.get('/builds', api.getBuilds);
apiRouter.get('/builds/:buildId', api.getBuild);
apiRouter.get('/builds/:buildId/logs', api.getBuildLogs);
apiRouter.post('/builds/:commitHash', api.postBuild);

exports.apiRouter = apiRouter;
