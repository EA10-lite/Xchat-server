
const cors = require("cors");

const cors_options = {
    origin: ["https://x-chat-client.vercel.app","http://localhost:3000", "http://localhost:3001"],
    'Access-Control-Allow-Origin': 'https://x-chat-client.vercel.app',
    'Access-Control-Allow-Credentials': true,
    credentials: true,
}

module.exports = (app) => {
  app.use(cors(cors_options));
}