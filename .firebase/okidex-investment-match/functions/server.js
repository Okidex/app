const { onRequest } = require('firebase-functions/v2/https');
  const server = import('firebase-frameworks');
  exports.ssrokidexinvestmentmatc = onRequest({"region":"us-central1","dependencies":{"cors":"^2.8.5","express":"^4.19.2"}}, (req, res) => server.then(it => it.handle(req, res)));
  