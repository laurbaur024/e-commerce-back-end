const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  const response = await Tag.findAll({
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'tag_products'
      },
    ]
  })
  res.status(200).json(response)
});

router.get('/:id', async (req, res) => {
  try {
    const response = await Tag.findByPk(req.params.id, {
    include: [
      {
        model: Product,
        through: ProductTag,
        as: 'tag_products'
      },
    ]
  })
  res.status(200).json(response)
} catch (err) {
  console.log (err)
  res.status(500).json(err)
}
});

router.post('/', (req, res) => {
  // create a new tag
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
