import express from "express";
import PatientsList from "../data/patients";
import patientServices from "../service/patients";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.json(patientServices.getPatientsWithoutSsn());
})

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        PatientsList.push(newPatient);
        res.json(newPatient);
    }
    catch(error: unknown) {
        let message: string = "error occured";
        
        if (error instanceof Error)
            message += error.message;

        res.json(message);
    }
})

export default router;