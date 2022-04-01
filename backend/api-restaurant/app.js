const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "welcome to restaurant manager application."});
});



const setupproductRoutes = require("./app/routes/product.routes");
setupproductRoutes(app);
module.exports = app;

const setupstaffRoutes = require("././app/routes/staff.routes");
setupstaffRoutes(app);
module.exports = app;


const setupbillRoutes = require("././app/routes/bill.routes");
setupbillRoutes(app);
module.exports = app;


const{ BadRequestError, errorHandler } = require("./app/errors");


const errors = require("./app/errors");


app.use((req, res , next) => {
    next(new BadRequestError(404,"Resource not found"));
});


app.use((err, req, res , next) => {
   errorHandler.handleError(error, res);
});
