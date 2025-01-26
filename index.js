require("dotenv").config();
require("express-async-errors");
const { errorResponse } = require("./utils/responseHandler");

const express = require('express');
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ limit: '1000mb', extended: true, parameterLimit: 1000000 }));
app.use(bodyParser.text({ limit: '1000mb' }));

require("./launch/cors")(app);
require("./launch/config")();
require("./launch/db")(); 
require("./launch/validation")();
require("./launch/routes")(app);
require("./launch/socket")(app);

app.use((err, req, res, next) => {
    if (err) {
      return errorResponse(res, 418, `${err.message}: ${err.field}`);
    } else {
      return errorResponse(res, 500, err.message);
    }
});


app.use("*", (req, res) => {
    return errorResponse(res, 404, {
      message: "path not found",
      method: req.method,
      path: req.originalUrl,
    });
});


app.listen(4000, () => {
    console.log('Server is running on port 4000');
});

// static files
app.use(express.static('public'));

