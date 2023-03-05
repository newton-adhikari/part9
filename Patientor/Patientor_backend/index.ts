import express from "express";

const app = express();
const PORT = 7008;

app.get("/api/ping", (_req, res) => {
    console.log("incoming ping request");
    res.send("pong");
});

app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`)
});