const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

//find find all tags
router.get('/', async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });

    res.status(200).json(tagData);
  } catch (err) { res.status(500).json(err); }
});

// find a tag product by its `id`
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    })

    if (!tagData) {
      res.status(404).json({ message: "No tags found with that ID." });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) { res.status(500).json(err); }
});

//create a new tag
router.post('/', async (req, res) => {
  try {
    const tagData = await Tag.create({
      tag_name: req.body.tag_name,
    });

    res.status(200).json(tagData);
  } catch (err) { res.status(400).json(err); }
});

//update a tage by its `id`
router.put('/:id', async (req, res) => {
  try {
    const tagData = await Tag.update(
      { tag_name: req.body.tag_name },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({ message: "Successfully updated Tag with ID of " + req.params.id });
  } catch (err) { res.status(400).json(err); }
});

//delete a tag byits `id`
router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy(
      {
        where: {
          id: req.params.id
        }
      }
    );

    if (!tagData) {
      res.status(404).json({ message: "No tag found with that ID" })
      return
    }

    res.status(200).json({ message: "Destroyed Tag with ID of " + req.params.id })
  } catch (err) { res.status(500).json(err); }
});

module.exports = router;