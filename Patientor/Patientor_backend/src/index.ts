import express from "express";
import cors from "cors";
import DianoseRouter from "./routes/diagnoses";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 7008;

app.get("/api/ping", (_req, res) => {
    console.log("incoming ping request");
    res.send("pong");
});

app.use("/api/diagnoses", DianoseRouter);

app.listen(PORT, () =>{
    console.log(`server listening on port ${PORT}`)
});