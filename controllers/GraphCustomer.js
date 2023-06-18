const Users = require("../models/User");
const getCustomerGraph = async (req, res) => {
  console.log(Users);
  try {
    const getUsers = await Users.aggregate([
      {
        $project: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          customerId: "$customerId",
        },
      },
      {
        $group: {
          _id: { month: "$month", year: "$year" },
          count: { $sum: 1 },
        },
      },
      { $sort: { year: -1, month: -1 } },
    ]);
    // const getUsers = await Users.find({})
    res.status(200).json({ message: "Sales of this month", getUsers });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Internal server error" });
  }
};

module.exports = { getCustomerGraph };
