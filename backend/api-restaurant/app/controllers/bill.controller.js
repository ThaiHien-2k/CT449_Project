const { handle } = require("express/lib/application");
const { BadRequestError } = require("../errors");
const Bill = require("../models/bill.model");
const handlePromise = require("../helpers/promise.helper");
const mongoose = require("mongoose");

// exports.create = (rep,res) => {
//     res.send({ message: "create handler" });
// };

// exports.findALL = (rep,res) => {
//     res.send({ message: "findALL handler" });
// };

// exports.findONE = (rep,res) => {
//     res.send({ message: "findOne handler" });
// };

// exports.update = (rep,res) => {
//     res.send({ message: "update handler" });
// };

// exports.delete = (rep,res) => {
//     res.send({ message: "delete handler" });
// };

// exports.deleteALL = (rep,res) => {
//     res.send({ message: "deleteALL handler" });
// };


exports.create = async (req , res ,next) =>{
    if(!req.body.table_name){
        return next(new BadRequestError(400, "table_name can not be empty"));
    }

    const bill = new Bill({
        table_name: req.body.table_name,
        product_name: req.body.product_name,
        amount: req.body.amount,
        staff_name: req.body.staff_name,
        tip: req.body.tip,
        total_money: req.body.total_money,
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
   const{table_name}  = req.query;
   if(table_name){
       condition.table_name = { $regex: new RegExp(table_name), $options: "i"};
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


 