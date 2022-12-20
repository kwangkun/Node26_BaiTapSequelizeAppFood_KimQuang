const express = require("express");
const app = express();
app.use(express.json());

const v1 = require("./routers/v1");
app.use("/api/v1", v1);

app.listen(4000);
