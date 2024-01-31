const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const ProductCart = require('../models/ProductCart');

const getAll = catchError(async(req, res) => {
    const { id } = req.user
    const results = await Purchase.findAll({
        include: [Product],
        where: {userId: id}
    });
    return res.json(results);
});

const createPurchase = catchError(async(req, res) => {
    
    const cartProduct = await ProductCart.findAll({
        where: {userId: req.user.id},
        attributes: ['userId', 'productId', 'quantity'],
        raw: true
    })
    const purchase = await Purchase.bulkCreate(cartProduct)
    await ProductCart.destroy({where: {userId: req.user.id}})

    return res.json(purchase)
})

module.exports = {
    getAll,
    createPurchase
}