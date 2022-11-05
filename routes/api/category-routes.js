const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// find all categories
router.get('/', async (req, res) => {
  try {
    const catData = await Category.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(catData);
  } catch (err) { res.status(500).json(err); }
});

// find one category by its `id` value
router.get('/:id', async (req, res) => {
  try {
    const catData = await Category.findByPk(req.params.id, {
      include: [{ model: Product }]
    })

    if (!catData) {
      res.status(404).json({ message: "No category found with that ID." })
      return
    }

    res.status(200).json(catData)
  } catch (err) { res.status(500).json(err); }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) { res.status(400).json(err); }
});

// update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const catData = await Category.update(
      {
        category_name: req.body.category_name,
      },
      {
        where: { id: req.params.id }
      })
    res.status(200).json({ message: "Successfully updated Category with ID of " + req.params.id });
  } catch (err) { res.status(400).json(err); }
});

// delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const catData = await Category.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    )

    if (!catData) {
      res.status(404).json({ message: "No category found with that ID" })
      return
    }

    res.status(200).json({ message: "Destroyed Category with ID of " + req.params.id })
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;