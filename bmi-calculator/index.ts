import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("hello fullstack");
})

app.get("/bmi", (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);
    const desc = calculateBmi(height, weight);
    let isError: boolean = false;
    let errorTxt: string = "";

    if(isNaN(height) || isNaN(weight)) {
        isError = true;
        errorTxt=  "parameter missing or unacceptable value";
    }

    if(!isError) res.json({weight, height, bmi: desc});
    else res.json({error: errorTxt});
})

app.post("/exercises", (req, res) => {
    const { daily_exercises, target } = req.body;
    let exercises: number[] = [];
    let isError = false;

    if (! daily_exercises || !target)
        return res.status(400).json({error: "parameters missing"});

    daily_exercises.forEach((n: any, i: number) => {
        if (!isNaN(Number(n))) exercises[i] = Number(n);
        else isError = true;
    })
    if (isError) return res.status(400).json({error: "malformed parameters"});

    return res.json(calculateExercises(Number(target), exercises));
})

const PORT = 6008;
app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})