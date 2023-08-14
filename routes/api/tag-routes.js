


const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');


//get all tags with products
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

//get tag by id with products
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

//create a new tag
router.post('/', async (req, res) => {
  try {
    const response = await Tag.create(req.body, {
      tag_name: req.body.tag_name
    })
    res.status(200).json(response)
   } catch (err) {
    res.status(500).json(err)
   }
  });

//update an existing tag
router.put('/:id', async (req, res) => {
  try {
    const response = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
});

//delete a tag
router.delete('/:id', async (req, res) => {
  try {
    const response = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(response)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
