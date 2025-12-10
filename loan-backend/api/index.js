const serverless = require("serverless-http");
const app = require("./server");
app.set("trust proxy", 1);
module.exports = serverless(app);
