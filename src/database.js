const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect('mongodb+srv://sertec:Futbol12@cluster0.42ewj.mongodb.net/sertec-database?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(db=>console.log('DB is connected')).catch(err=>console.log(err));

// Local test:
/*
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
*/