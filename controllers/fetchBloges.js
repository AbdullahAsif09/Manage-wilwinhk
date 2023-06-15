const Blog = require('../models/Blog')
const fetchBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({}).sort({date:"desc"});
        res.status(200).send({ blogs })

    } catch (error) {
        console.log(error)
        res.status(400).send({ error: error.message })
    }
}

module.exports = { fetchBlogs };