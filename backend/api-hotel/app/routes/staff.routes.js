const express = require("express");
const staffs = require("../controllers/staff.controller");


module.exports = (app) => {
    const router = express.Router();

    router.get("/",staffs.findALL);

    router.post("/",staffs.create);

    router.delete("/",staffs.deleteALL);


    router.get("/:id",staffs.findOne);

    router.put("/:id",staffs.update);

    router.delete("/:id",staffs.delete);

    app.use("/api/staffs", router);
};