import express from "express";
import PatientsList from "../data/patients";
import patientServices from "../service/patients";
import toNewPatient from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
    res.json(patientServices.getPatientsWithoutSsn());
})

router.get("/:id", (req, res) => {
    const id = req.params.id;
    const patient = PatientsList.find(p => p.id === id);

    if (patient) res.json(patient);
    else res.status(400).json({error: "no such patient"});
})

router.post("/", (req, res) => {
    try {
        const newPatient = toNewPatient(req.body);
        PatientsList.push(newPatient);
        res.status(400).json(newPatient);
    }
    catch(error: unknown) {
        let message: string = "error occured";
        
        if (error instanceof Error)
            message += error.message;

        res.json(message);
    }
})

export default router;