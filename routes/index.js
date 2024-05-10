const express = require('express');
const wompiRouter = require('./wompi/Wompi.router');
const providerRouter = require('./providers/provider.routes');
const serviceRouter = require('./providers/service.routes');
const documentRouter = require('./providers/document.routes');
const clinicsRouter = require('./veterinary_clinics/veterinary_clinics.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/wompi', wompiRouter);
  router.use('/provider', providerRouter);
  router.use('/document', documentRouter);
  router.use('/service', serviceRouter);
  router.use('/clinics', clinicsRouter);
}

module.exports = routerApi;