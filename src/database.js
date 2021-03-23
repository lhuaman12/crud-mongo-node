const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/clients-app',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(db=>console.log('DB is connected')).catch(err=>console.log(err));