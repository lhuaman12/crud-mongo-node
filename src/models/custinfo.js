const mongoose = require('mongoose');
const {Schema} = mongoose;

const Custschema= new Schema ({
    date:{type:Date,default: Date.now},
    name:{type: String,required:true},
    lastname:{type:String,required:true},
    adress:{type:String,required:true},
    city :{type:String,required:true},
    phoneNumber:{type:String,required:true},
    productBrand:{type:String,required:true},
    productModel:{type:String,required:true},
    status : {type:String,required:true},
    commentary:{type:String}

});

module.exports = mongoose.model('Customer',Custschema);