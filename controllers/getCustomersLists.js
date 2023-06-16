const User = require('../models/User')

const fetchCustomers = async (req, res) => {
    try {
        const customers = await User.find({}).sort({ date: "desc" });
        res.status(200).send({ customers })
    } catch (error) {
        res.status(500).send({ error: error.message })
    }
}

module.exports = { fetchCustomers }