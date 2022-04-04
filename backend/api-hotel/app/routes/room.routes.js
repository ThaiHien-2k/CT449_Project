const express = require("express");
const rooms = require("../controllers/room.controller");


module.exports = (app) => {
    const router = express.Router();

    router.get("/",rooms.findALL);

    router.post("/",rooms.create);

    router.delete("/",rooms.deleteALL);


    router.get("/:id",rooms.findOne);

    router.put("/:id",rooms.update);

    router.delete("/:id",rooms.delete);

    app.use("/api/rooms", router);
};