import express from "express";
const port = 3000;

const app: express.Application = express();

app.listen(port, () => console.log("App started on port " + port));
