const express = require('express');
//const { isValidObjectId } = require('mongoose');
//const { db } = require('../models/custinfo');
const router = express.Router();
const stringControls = require('../helpers/functions');
const Customer = require('../models/custinfo');
//const Product = require('../models/products');

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
    const {
        name,
        lastname,
        adress,
        locality,
        phoneNumber,
        commentary
    } = req.body;

    if (!name)
        errors.push({ text: "Escriba un nombre" });
    if (!lastname)
        errors.push({ text: "Escriba un apellido" });
    if (!adress)
        errors.push({ text: "Escriba una direccion" });
    if (!locality)
        errors.push({ text: "Escriba la localidad" });
    if (!phoneNumber || isNaN(phoneNumber))
        errors.push({ text: "Escriba un numero de telefono" });
    if (errors.length > 0)
        res.render('customers/new-customer', {
            errors,
            name,
            lastname,
            adress,
            phoneNumber,
            commentary,
            locality
        });
    else {
        let newCustomer = new Customer({ name, lastname, adress, locality, phoneNumber, commentary });
        newCustomer = stringControls.normalizeObject(newCustomer);
        const customerId = newCustomer._id;
        await newCustomer.save();
        res.render('customers/products/new-product', { customerId });
    }
});

router.get('/customers/:customerId/add-product', (req, res) => {
    let { customerId } = req.params;
    console.log(customerId);
    res.render('customers/products/new-product', { customerId });
});

router.post('/customers/products/submit-product/:id', async (req, res) => {
    let errors = [];
    let { productBrand, productModel, productCommentary, status } = req.body
    let customerId = req.params.id;

    console.log(req.body);
    if (!productBrand)
        errors.push({ text: "Escriba una marca" });
    if (!productModel)
        errors.push({ text: "Escriba un modelo" });
    if (errors.length > 0)
        res.render('customers/products/new-product', {
            errors,
            productBrand,
            productModel,
            productCommentary,
            customerId
        });
    else {
        let customer = await Customer.findById(customerId);
        customer.repairs.push(req.body);
        customer.save();
        res.redirect('/');

    }
});

router.get('/customers/search-customers', (req, res) => {
    res.render('customers/search-customers');
});

router.post('/customers/submit-search', async (req, res) => {
    req.body = stringControls.deleteBlankSpaces(req.body);  // implementar como middleware luego
    req.body = stringControls.normalizeObject(req.body);
    let search = await Customer.find(req.body);
    search = stringControls.capitalizeObjects(search);
    console.log(search);
    res.render('customers/result-search', { search });

});

router.get('/customers/:id/products', async (req, res) => {
    let customerId = req.params.id;
    let customer = await Customer.findById(customerId);
    let products = customer.repairs;
    res.render('customers/products/products-list', { products, customerId });

});
router.get('/customers/edit-product/:customerId/:productId', async (req, res) => {
    let { customerId, productId } = req.params;
    customer = await Customer.findById(customerId);
    let productIndex = customer.repairs.map(object => object._id).findIndex(id => id == productId);
    let product = customer.repairs[productIndex];
    res.render('customers/products/edit-product', { product, customerId })
});
//TODO: controlar errores en edicion
router.put('/customers/edit/:customerId/:productId', async (req, res) => {
    let { customerId, productId } = req.params;
    customer = await Customer.findById(customerId);
    let productIndex = customer.repairs.map(object => object._id).findIndex(id => id == productId);
    Object.assign(customer.repairs[productIndex], req.body);
    await customer.save({ new: false });
    res.redirect('/');
});

router.get('/customers/edit-customer/:id', async (req, res) => {
    let value = await Customer.findById(req.params.id);
    value = stringControls.capitalizeObjects(value);
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

router.delete('/customers/:customerId/delete-product/:productId', async (req, res) => {
    let { productId, customerId } = req.params;
    customer = await Customer.findById(customerId);
    let productIndex = customer.repairs.map(object => object._id).findIndex(id => id == productId);
    customer.repairs.splice(productIndex, 1);
    await customer.save({ new: false });
    res.redirect('/');
});

module.exports = router;
