const mongoose = require('mongoose');
const {Schema} = mongoose;


const ProductSchema = new Schema ({
    productDate: {type:Date, default: Date.now},
    productBrand:String,
    productModel:String,
    productCommentary: String,
    repairedDate:{ type:Date,default:undefined},
    status : String
});

module.exports=mongoose.model('Products',ProductSchema);