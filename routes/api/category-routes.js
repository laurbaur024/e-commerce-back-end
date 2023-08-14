


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

//create a new category
router.post('/', async (req, res) => {
 
});

//update a category
router.put('/:id', async (req, res) => {
  try {
    const response = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
});

//delete a category
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
