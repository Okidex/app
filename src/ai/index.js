import { onRequest } from "firebase-functions/v2/https";

export const helloAI = onRequest((request, response) => {
  response.send("AI Function is active!");
});
