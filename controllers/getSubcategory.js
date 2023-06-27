const Products = require("../models/Product.js");
const getSubCategories = async (req, res) => {
  try {
    //   let field = "Cables";
    const getsubcategories = await Products.aggregate([
      { $match: { category: req.params.category } },
      { $group: { _id: "$subCategory", count: { $sum: 1 } } },
      { $project: { _id: 0, subcategory: "$_id", count: 1 } },
    ]);
    // const getUsers = await Users.find({})
    res.status(201).json({ getsubcategories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { getSubCategories };
