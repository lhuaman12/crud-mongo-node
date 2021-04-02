const mongoose = require('mongoose');

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
})
.then(db=>console.log('DB is connected')).catch(err=>console.log(err));
*/
