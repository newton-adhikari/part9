import { Diagnose, DiagnoseWithoutLatin } from "../types"
import DiagnoseList from "../data/diagnoses";

const getAllDiagnoses = () : Diagnose[] => {
    return DiagnoseList;
}

const getDiagnosesWithoutLatin = () : DiagnoseWithoutLatin[] => {
    return DiagnoseList.map(({code, name}) => ({
        code,
        name
    }))
}

export default {
    getAllDiagnoses,
    getDiagnosesWithoutLatin
}