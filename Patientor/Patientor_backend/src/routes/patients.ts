import express from "express";
import patientServices from "../service/patients";

const router = express.Router();

router.get("/", (_req, res) => {
    res.json(patientServices.getPatientsWithoutSsn());
})

export default router;