const { handle } = require("express/lib/application");
const { BadRequestError } = require("../errors");
const Bill = require("../models/bill.model");
const handlePromise = require("../helpers/promise.helper");
const mongoose = require("mongoose");



exports.create = async (req , res ,next) =>{
    if(!req.body.room_name){
        return next(new BadRequestError(400, "room_name can not be empty"));
    }

    const bill = new Bill({
        room_name: req.body.room_name,
        type: req.body.type,
        cost: req.body.cost,
        name: req.body.name,
        CMND: req.body.CMND,
        phone: req.body.phone,
        nam: req.body.nam===true,
        staff_name: req.body.staff_name,
        
        time: req.body.time,
        total: req.body.total
    });

    const [error, document] = await handlePromise(bill.save());

    if(error) {
        return next(new BadRequestError(500, 
            "An error occurred while creating the bill"));
    }
    return res.send(document);
};


exports.findALL = async(req, res ,next) =>{
   const condition = { };
   const{room_name}  = req.query;
   if(room_name){
       condition.room_name = { $regex: new RegExp(room_name), $options: "i"};
   } 

   const [error, documents] = await handlePromise(Bill.find(condition));

   if(error) {
       return next(new BadRequestError(500,
        "An error occurred while retrieving Bills"));
   }
   return res.send(documents);
};


exports.findOne = async(req, res ,next) =>{
    const {id} = req.params;
    const condition = { 
        _id: id && mongoose.isValidObjectId(id) ? id : null,
     };
   
    const[error, document] = await handlePromise(Bill.findOne(condition));

    
   if(error) {
    return next(new BadRequestError(500,
        `error retrieving Bill with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Bill not found"));
    }

    return res.send(document);
 };

 exports.update = async(req, res ,next) =>{
    if(Object.keys(req.body).length ===0){
        return next(new BadRequestError(400,
            "data to update can not be empty"));

    }

    const{id} = req.params;

    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
    
   
    const[error, document] = await handlePromise(
        Bill.findOneAndUpdate(condition, req.body,{
        new: true,
        })
    );

    
   if(error) {
    return next(new BadRequestError(500,
        `error updating Bill with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Bill not found"));
    }

    return res.send({message: "Bill was updated successfully",});
 };


 exports.delete = async(req, res ,next) =>{
    const{id} = req.params;

    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
   
    const[error, document] = await handlePromise(
        Bill.findOneAndDelete(condition)
    );

    
   if(error) {
    return next(new BadRequestError(500,
        `could not delete Bill with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Bill not found"));
    }

    return res.send({message: "Bill was deleted successfully",});
 };



 exports.deleteALL = async(req, res ,next) =>{
   
    const[error, data] = await handlePromise(
        Bill.deleteMany({ })
    );

    
   if(error) {
    return next(new BadRequestError(500,
        "An error occurred while removing Bills"));
    }
   return res.send({
       message: `${data.deletedCount} Bills were daleted successfully`,
   });
 };


 