const express= require('express');
const app=express();
const path=require('path');
const exphbs=require('express-handlebars');
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const morgan = require('morgan');
const methodOverride=require('method-override');
//
require('./database');

/// configs
app.set('port',3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
}));
app.set('view engine','.hbs');


// static files
app.use(express.static(path.join(__dirname,'public')));

//middlewares
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));



// routers
app.use(require('./routes/index'));
app.use(require('./routes/customers'));

// server

app.listen(app.get('port'),()=>{
    console.log('Listening on port ',app.get('port'));
});