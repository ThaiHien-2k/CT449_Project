const { handle } = require("express/lib/application");
const { BadRequestError } = require("../errors");
const Staff = require("../models/staff.model");
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
    if(!req.body.name){
        return next(new BadRequestError(400, "Name can not be empty"));
    }

    const staff = new Staff({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        phone: req.body.phone,
        salary: req.body.salary,
        men: req.body.men === true,
    });

    const [error, document] = await handlePromise(staff.save());

    if(error) {
        return next(new BadRequestError(500, 
            "An error occurred while creating the staff"));
    }
    return res.send(document);
};


exports.findALL = async(req, res ,next) =>{
   const condition = { };
   const{name}  = req.query;
   if(name){
       condition.name = { $regex: new RegExp(name), $options: "i"};
   } 

   const [error, documents] = await handlePromise(Staff.find(condition));

   if(error) {
       return next(new BadRequestError(500,
        "An error occurred while retrieving Staffs"));
   }
   return res.send(documents);
};


exports.findOne = async(req, res ,next) =>{
    const {id} = req.params;
    const condition = { 
        _id: id && mongoose.isValidObjectId(id) ? id : null,
     };
   
    const[error, document] = await handlePromise(Staff.findOne(condition));

    
   if(error) {
    return next(new BadRequestError(500,
        `error retrieving Staff with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Staff not found"));
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
        Staff.findOneAndUpdate(condition, req.body,{
        new: true,
        })
    );

    
   if(error) {
    return next(new BadRequestError(500,
        `error updating Staff with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Staff not found"));
    }

    return res.send({message: "Staff was updated successfully",});
 };


 exports.delete = async(req, res ,next) =>{
    const{id} = req.params;

    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
   
    const[error, document] = await handlePromise(
        Staff.findOneAndDelete(condition)
    );

    
   if(error) {
    return next(new BadRequestError(500,
        `could not delete Staff with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Staff not found"));
    }

    return res.send({message: "Staff was deleted successfully",});
 };



 exports.deleteALL = async(req, res ,next) =>{
   
    const[error, data] = await handlePromise(
        Staff.deleteMany({ })
    );

    
   if(error) {
    return next(new BadRequestError(500,
        "An error occurred while removing Staffs"));
    }
   return res.send({
       message: `${data.deletedCount} Staffs were daleted successfully`,
   });
 };


 