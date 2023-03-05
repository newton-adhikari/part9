import express from "express";
import diagnoseService from "../service/diagnoses";

const router = express.Router();

router.get("/", (_req, res) => {
    res.json(diagnoseService.getAllDiagnoses());
})

export default router;