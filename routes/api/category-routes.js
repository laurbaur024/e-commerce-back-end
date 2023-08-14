


const router = require('express').Router();
const { Category, Product } = require('../../models');


//get all categories with products
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

//get category by id with products
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

router.delete('/:id', async (req, res) => {
  try {
    const response = await Category.destroy({
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
