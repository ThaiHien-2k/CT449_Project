const express = require("express");
const bills = require("../controllers/bill.controller");


module.exports = (app) => {
    const router = express.Router();

    router.get("/",bills.findALL);

    router.post("/",bills.create);

    router.delete("/",bills.deleteALL);


    router.get("/:id",bills.findOne);

    router.put("/:id",bills.update);

    router.delete("/:id",bills.delete);

    app.use("/api/bills", router);
};