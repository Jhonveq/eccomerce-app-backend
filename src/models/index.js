const Category = require("./Category");
const Product = require("./Product");
const Image = require("./Image");
const ProductCart = require("./ProductCart");
const User = require("./User");
const Purchase = require("./Purchase");

Product.belongsTo(Category);
Category.hasMany(Product);

Image.belongsTo(Product)
Product.hasMany(Image)

User.hasMany(ProductCart)
ProductCart.belongsTo(User)

Product.hasMany(ProductCart)
ProductCart.belongsTo(Product)

User.hasMany(Purchase)
Purchase.belongsTo(User)

Product.hasMany(Purchase)
Purchase.belongsTo(Product)