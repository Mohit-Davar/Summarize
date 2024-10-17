const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 8080;


app.use(express.urlencoded({ extended: false }));
const path = require("path")
app.use(express.static(path.join(__dirname, 'public')));

const workbookRouter = require("./routes/workbookRoute")
const chatRouter = require("./routes/chatRoute")
app.use("/workbook", workbookRouter);
app.use("/chat", chatRouter)
app.get("/", (req, res) => {
    res.render("index")
})
// Setting Up Templating Engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.listen(PORT, (err) => {
    if (err) {
        console.error(err)
    }
    console.log(`Server Started at Port: ${PORT}`)
})