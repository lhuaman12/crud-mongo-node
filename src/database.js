const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://sertec:gaQHYeY3txtyt6Gw@cluster0.42ewj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false,
    useUnifiedTopology:true
})
.then(db=>console.log('DB is connected')).catch(err=>console.log(err));