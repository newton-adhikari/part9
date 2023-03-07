import { Patient, PatientWithoutSSN } from "../types"
import PatientsList from "../data/patients"

const getAllPatients = () : Patient[] => {
    return PatientsList;
}

const getPatientsWithoutSsn = () : PatientWithoutSSN[] => {
    return PatientsList.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
        entries
    }))
}

export default {
    getAllPatients,
    getPatientsWithoutSsn
}