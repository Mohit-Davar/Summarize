const express = require("express");
const app = express();
const http = require('http')

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const workbookRouter = require("./routes/workbookRoute")
app.use("/workbook", workbookRouter);
const staticRouter = require("./routes/staticRoute")
app.use("/", staticRouter)

// initialize Socket.IO
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);
const { handleChat } = require('./controllers/handleChat')
io.on("connection", (socket) => {
    app.set("socket", socket)
    socket.on("query", (data) => {
        handleChat(data, socket)
    })
})

// Setting Up Templating Engine
const path = require("path");
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static(path.join(__dirname, 'public')));

require('dotenv').config();
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => { console.log(`Server Started at Port: ${PORT}`) })