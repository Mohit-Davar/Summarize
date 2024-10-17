// Acquiring Express 
const express = require("express");
const router = express.Router();
const axios = require('axios');
require("dotenv").config()

router.route("/")
    .get((req, res) => {
        res.render('chat');
    })
    .post((req, res) => {
        const body = req.body;
        const query = { query: body.question }; // Assumes `question` is the field in the body

        axios.post(process.env.server_link, query)
            .then(response => {
                // const citations = response.data.ans.Sources
                console.log(response.data)
                res.status(200).render("chat", {
                    answer: response.data.ans.response,
                    // citations: citations
                })
            })
            .catch(error => {
                console.error('Error:', error);
                res.status(500).json({
                    success: false,
                    message: 'Something went wrong!',
                    error: error.message
                });
            });
    });

module.exports = router;
