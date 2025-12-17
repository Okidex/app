const { onRequest } = require("firebase-functions/v2/https");

exports.helloAI = onRequest((request, response) => {
  response.send("AI Function is active!");
});

