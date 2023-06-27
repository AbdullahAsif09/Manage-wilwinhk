const Products = require("../models/Product.js");
const getCategories = async (req, res) => {
  try {
    const getcategories = await Products.aggregate([
      { $group: { _id: "$category" } },
      { $project: { _id: 0, category: "$_id" } },
      { $sort: { category: 1 } },
    ]);
    // const getUsers = await Users.find({})
    res.status(201).json({ message: "Sales of this month", getcategories });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { getCategories };
