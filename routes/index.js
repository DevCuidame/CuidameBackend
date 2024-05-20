const express = require('express');
const wompiRouter = require('./wompi/Wompi.router');
const providerRouter = require('./providers/provider.routes');
const serviceRouter = require('./providers/service.routes');
const documentRouter = require('./providers/document.routes');
const legalRepRouter = require('./providers/lega_rep.router');
const establishmentRouter = require('./providers/establishment.router');
const clinicsRouter = require('./veterinary_clinics/veterinary_clinics.routes');

function routerApi(app) {
  const router = express.Router();
  app.use('/api', router);
  router.use('/wompi', wompiRouter);
  router.use('/provider', providerRouter);
  router.use('/document', documentRouter);
  router.use('/service', serviceRouter);
  router.use('/clinics', clinicsRouter);
  router.use('/legalrep', legalRepRouter);
  router.use('/establishment', establishmentRouter);
}

module.exports = routerApi;