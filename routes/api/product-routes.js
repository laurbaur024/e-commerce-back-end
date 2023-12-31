


const router = require('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');


// get all products with tag data
router.get('/', async (req, res) => {
  const response = await Product.findAll({
    include: [
      {
        model: Category,
      },
      {
        model: Tag,
        through: ProductTag,
        as: 'products_tags'
      }
    ]
  })
  res.status(200).json(response)
});

// get one product with tag data
router.get('/:id', async (req, res) => {
  try {
    const response = await Product.findByPk(req.params.id, {
    include: [
      {
        model: Category,
      },
      {
        model: Tag,
        through: ProductTag,
        as: 'products_tags'
      }
    ]
  })
  res.status(200).json(response)
} catch (err) {
  console.log (err)
  res.status(500).json(err)
}
});

// create new product
router.post('/', (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if there's product tags, we need to create pairings to bulk create in the ProductTag model
      if (req.body.tagIds.length) {
        const productTagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            product_id: product.id,
            tag_id,
          };
        });
        return ProductTag.bulkCreate(productTagIdArr);
      }
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put('/:id', (req, res) => {
  // update product data
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((product) => {
      if (req.body.tagIds && req.body.tagIds.length) {
        
        ProductTag.findAll({
          where: { product_id: req.params.id }
        }).then((productTags) => {
          // create filtered list of new tag_ids
          const productTagIds = productTags.map(({ tag_id }) => tag_id);
          const newProductTags = req.body.tagIds
          .filter((tag_id) => !productTagIds.includes(tag_id))
          .map((tag_id) => {
            return {
              product_id: req.params.id,
              tag_id,
            };
          });

            // figure out which ones to remove
          const productTagsToRemove = productTags
          .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
          .map(({ id }) => id);
                  // run both actions
          return Promise.all([
            ProductTag.destroy({ where: { id: productTagsToRemove } }),
            ProductTag.bulkCreate(newProductTags),
          ]);
        });
      }

      return res.json(product);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

//delete product by id
router.delete('/:id', async (req, res) => {
  try {
    const response = await Product.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router;
