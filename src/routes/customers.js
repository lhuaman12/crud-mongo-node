const express = require('express');
const { isValidObjectId } = require('mongoose');
const { db } = require('../models/custinfo');
const router = express.Router();
const stringControls = require('../helpers/functions');
const Customer = require('../models/custinfo');

router.get('/customers', async (req, res) => {
    let search = await Customer.find();
    //console.log(search);
    search = stringControls.capitalizeObjects(search);
    // console.log(search);
    res.render('customers/customers-list', { search });
});

router.get('/customers/new-customer', (req, res) => {
    res.render('customers/new-customer');
});

router.post('/customers/submit-client', async (req, res) => {
    let errors = [];
    const { name, lastname, adress, city, phoneNumber, productBrand, productModel, status, commentary, repairedDate } = req.body;
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
    if (status == "repaired" && repairedDate == '')
        errors.push({ text: 'Elija una fecha de reparacion' })


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
        let newCustomer = new Customer({ name, lastname, adress, city, phoneNumber, productBrand, productModel, status, commentary, repairedDate });
        newCustomer = stringControls.normalizeObject(newCustomer);
        //console.log(newCustomer);
        await newCustomer.save();
        res.redirect('/');
    }
});

router.get('/customers/search-customers', (req, res) => {
    res.render('customers/search-customers');
});

router.post('/customers/submit-search', async (req, res) => {
    req.body=stringControls.deleteBlankSpaces(req.body);
    let search = await Customer.find(req.body);
    search = stringControls.capitalizeObjects(search);
    res.render('customers/result-search', { search });

});

router.get('/customers/edit-customer/:id', async (req, res) => {
    let value = await Customer.findById(req.params.id);
    value=stringControls.capitalizeObjects(value);
    res.render('customers/edit-customer', { value });
});


router.put('/customers/edit/:id', async (req, res) => {
    let newValue = req.body;
    newValue = stringControls.normalizeObject(newValue);
    await Customer.findByIdAndUpdate(req.params.id, newValue);
    res.redirect('/')
});

router.delete('/customers/delete-customer/:id', async (req, res) => {

    await Customer.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

module.exports = router;