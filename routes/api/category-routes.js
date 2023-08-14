const router = require('express').Router();
const { Category, Product } = require('../../models');



router.get('/', async (req, res) => {
  const response = await Category.findAll({
    include: [
      {
        model: Product,
      },
    ]
  })
  res.status(200).json(response)
});

router.get('/:id', async (req, res) => {
  try {
    const response = await Category.findByPk(req.params.id, {
    include: [
      {
        model: Product,
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
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
