const { getAll, createPurchase } = require('../controllers/purchase.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT')


const purchaseRouter = express.Router();

purchaseRouter.route('/purchases')
    .get(verifyJWT, getAll)
    .post(verifyJWT, createPurchase)

module.exports = purchaseRouter;