


const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'null'
})

Product.belongsTo(Category, {
  foreignKey: 'category_id'
})

Product.belongToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'product_tag'
})

Tag.belongToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  as: 'tag_product'
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
