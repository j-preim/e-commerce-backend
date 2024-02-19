const router = require("express").Router();
const { Category, Product, Tag, ProductTag } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const categoryData = await Category.findAll({
    include: [{ model: Product }],
  });
  res.json(categoryData);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const categoryData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  });
  res.json(categoryData);
});

router.post("/", async (req, res) => {
  // create a new category
  /* req.body should look like this...
    {
      "category_name": "Basketball"
    }
  */
  try {
    const categoryData = await Category.create({
      category_name: req.body.category_name
    });
    res.json(categoryData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      return res.json(category);
    })
    .catch((err) => {
      // console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((deletedCategory) => {
      res.json(deletedCategory);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
