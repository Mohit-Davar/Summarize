const axios = require('axios');
require("dotenv").config();
const handleChat = (data, socket) => {
    const query = { query: data };
    axios.post(process.env.server_link, query)
        .then(response => {
            // console.log(response.data)
            const citations = response.data.ans.sourcess
            const answer = response.data.ans.response.split("\n")
            socket.emit("answer", { answer, citations })
            return
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
module.exports = {
    handleChat
}
