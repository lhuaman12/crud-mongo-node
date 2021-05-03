const mongoose = require('mongoose');
const { Schema } = mongoose;
//const ProductSchema = require ('./products');
/*
const Custschema= new Schema ({
    date:{type:Date,default: Date.now},
    name:{type: String,required:true},
    lastname:{type:String,required:true},
    adress:{type:String,required:true},
    city :{type:String,required:true},
    repairedDate : {type:Date,default:undefined},
    phoneNumber:{type:String,required:true},
    productBrand:{type:String,required:true},
    productModel:{type:String,required:true},
    status : {type:String,required:true},
    commentary:{type:String}

});

*/
// tratar de separar en dos schemas

const Custschema = new Schema({
    registerDate: { type: Date, default: Date.now },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    adress: { type: String, required: true },
    locality: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    commentary: String,
    repairs: [{
        productDate: { type: Date, default: Date.now },
        productBrand: String,
        productModel: String,
        productCommentary: String,
        repairedDate: { type: Date, default: undefined },
        status : String
        }
    ]
});


module.exports = mongoose.model('Customer', Custschema);