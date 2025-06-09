const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const cookieParser = require("cookie-parser");
app.use(cookieParser());

const authenticateToken = require("./middleware/authenticateToken.js");
const users = require("./routes/user.route.js");
app.use("/users", users);
const files = require("./routes/file.route.js");
app.use("/file", files);

//Connecting the Database
const client = require("./service/db.js");
const redis = require("./service/redis.js");
redis.on("connect", () => {
    console.log("Connected to Redis");
});
redis.on("error", (err) => {
    console.error("Redis client encountered an error:", err);
});
client
    .connect()
    .then(() => console.log("Connected to PostgreSQL"))
    .catch((err) => console.error("Connection error", err.stack));

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server Started at ${PORT}`));