const express = require('express');
const { isValidObjectId } = require('mongoose');
const { db } = require('../models/custinfo');
const router = express.Router();

const Customer = require('../models/custinfo');

router.get('/customers', async (req, res) => {
    const data = await Customer.find();
    res.render('customers/customers-list', { data });
});

router.get('/customers/new-customer', (req, res) => {
    res.render('customers/new-customer');
});

router.post('/customers/submit-client', async (req, res) => {
    let errors = [];
    const { name, lastname, adress, city, phoneNumber, productBrand, productModel, status, commentary } = req.body;
    console.log(req.body);
    if (!name)
        errors.push({ text: "Escriba un nombre" });

    if (!lastname)
        errors.push({ text: "Escriba un apellido" });
    if (!adress)
        errors.push({ text: "Escriba una direccion" });
    if (!city)
        errors.push({ text: "Escriba la localidad" });
    if (!phoneNumber || isNaN(phoneNumber))
        errors.push({ text: "Escriba un numero de telefono" });
    if (!productBrand)
        errors.push({ text: "Escriba la marca del producto" });
    if (!productModel)
        errors.push({ text: "Escriba el modelo del producto" });
    if (!status)
        errors.push({ text: "Escriba un estado" });

    if (errors.length > 0)
        res.render('customers/new-customer', {
            errors,
            name,
            lastname,
            adress,
            phoneNumber,
            status,
            commentary,
            city,
            productBrand,
            productModel,

        });
    else {
        const newCustomer = new Customer({ name, lastname, adress, city, phoneNumber, productBrand, productModel, status, commentary });
        await newCustomer.save();
        console.log(newCustomer);
        res.redirect('/customers');
    }
});

router.get('/customers/search-customers', (req, res) => {
    res.render('customers/search-customers');
});

router.post('/customers/submit-search', async (req, res) => {
    let data = req.body // TODO: borrar entries con '' para buscar en base de datos
    //let result =Object.entries(data).reduce((a,[k,v]) => (v ? (a[k]=v, a) : a), {});
    for (const key in data) {
        if (data[key] == '')
            delete data[key];
    }
    const search = await Customer.find(data);
    console.log(search);
    res.render('customers/result-search', { search });

});

router.get('/customers/edit-customer/:id', async (req, res) => {
    console.log(req.params.id);
    const value = await Customer.findById(req.params.id);
    console.log(value);
    res.render('customers/edit-customer', { value });

});


router.put('/customers/edit/:id', async (req, res) => {
    const value = req.body;
    await Customer.findByIdAndUpdate(req.params.id, value);
    res.redirect('/')
});

router.delete('/customers/delete-customer/:id', async (req, res) => {

    await Customer.findByIdAndDelete(req.params.id);
    res.send('ok');
});

module.exports = router;