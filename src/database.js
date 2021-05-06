const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb://localhost/clients-app',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
});
db.on('error',console.error.bind(console,'Connection error'));
db.once('open',()=>{
    console.log('Connected to the DB');
});
