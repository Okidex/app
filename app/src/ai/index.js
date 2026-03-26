import { onRequest } from "firebase-functions/v2/https";

export const helloAI = onRequest({ cors: true }, (request, response) => {
  response.send("AI Function is active!");
});
