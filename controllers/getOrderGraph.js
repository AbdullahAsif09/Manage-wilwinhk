const Order = require("../models/Order");
const getOrderGraph = async (req, res) => {
  try {
    const getOrder = await Order.aggregate([
      {
        $project: {
          month: { $month: "$date" },
          year: { $year: "$date" },
          customerId: "$_id",
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          count: { $sum: 1 },
        },
      },
      { $sort: { "_id.year": -1, "_id.month": 1 } },
    ]);
    res.status(200).json({ message: "Sales of this month", getOrder });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { getOrderGraph };
