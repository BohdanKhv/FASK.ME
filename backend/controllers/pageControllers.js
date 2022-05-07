const Page = require('../models/pageModel');



// @desc   Update page 
// @route  GET /api/pages
// @access Private
const updatePage = async (req, res) => {
    try {
        const page  = await Page.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.status(200).json(page);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
}


module.exports = {
    updatePage,
}