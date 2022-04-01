const { handle } = require("express/lib/application");
const { BadRequestError } = require("../errors");
const Product = require("../models/product.model");
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

    const product = new Product({
        name: req.body.name,
        cost: req.body.cost,
        type: req.body.type,
       
    });

    const [error, document] = await handlePromise(product.save());

    if(error) {
        return next(new BadRequestError(500, 
            "An error occurred while creating the product"));
    }
    return res.send(document);
};


exports.findALL = async(req, res ,next) =>{
   const condition = { };
   const{name}  = req.query;
   if(name){
       condition.name = { $regex: new RegExp(name), $options: "i"};
   } 

   const [error, documents] = await handlePromise(Product.find(condition));

   if(error) {
       return next(new BadRequestError(500,
        "An error occurred while retrieving Products"));
   }
   return res.send(documents);
};


exports.findOne = async(req, res ,next) =>{
    const {id} = req.params;
    const condition = { 
        _id: id && mongoose.isValidObjectId(id) ? id : null,
     };
   
    const[error, document] = await handlePromise(Product.findOne(condition));

    
   if(error) {
    return next(new BadRequestError(500,
        `error retrieving Product with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Product not found"));
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
        Product.findOneAndUpdate(condition, req.body,{
        new: true,
        })
    );

    
   if(error) {
    return next(new BadRequestError(500,
        `error updating Product with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Product not found"));
    }

    return res.send({message: "Product was updated successfully",});
 };


 exports.delete = async(req, res ,next) =>{
    const{id} = req.params;

    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id : null,
    };
   
    const[error, document] = await handlePromise(
        Product.findOneAndDelete(condition)
    );

    
   if(error) {
    return next(new BadRequestError(500,
        `could not delete Product with id=${req.params.id}`));
}
    if(!document) {
        return next(new BadRequestError(404,"Product not found"));
    }

    return res.send({message: "Product was deleted successfully",});
 };



 exports.deleteALL = async(req, res ,next) =>{
   
    const[error, data] = await handlePromise(
        Product.deleteMany({ })
    );

    
   if(error) {
    return next(new BadRequestError(500,
        "An error occurred while removing Products"));
    }
   return res.send({
       message: `${data.deletedCount} Products were daleted successfully`,
   });
 };


 