require("dotenv").config();
const express = require("express");
const cors = require("cors");
const router = require("./Router/router");
require("./connection");

const app = express();

app.use(cors());

app.use(express.json());
app.use(router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Todo Server start listening at port:${PORT}`);
});

app.get("/", (req, res) => {
    res.send("<h1>Todo Server is live.......</h1>");
});
