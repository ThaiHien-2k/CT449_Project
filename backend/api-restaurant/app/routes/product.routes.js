const express = require("express");
const products = require("../controllers/product.controller");


module.exports = (app) => {
    const router = express.Router();

    router.get("/",products.findALL);

    router.post("/",products.create);

    router.delete("/",products.deleteALL);


    router.get("/:id",products.findOne);

    router.put("/:id",products.update);

    router.delete("/:id",products.delete);

    app.use("/api/products", router);
};