import {Patient} from "../../types";
import { useParams } from "react-router-dom";

interface props {
    patients: Patient[]
}

const PatientPage = ({patients}: props) => {
    const id = useParams().id;
    const patient: Patient = patients.find(p => p.id === id) as Patient;

    return <>
        <h2>{patient.name}</h2>
        <p>ssn {patient.ssn}</p>
        <p>occupation {patient.occupation}</p>
    </>
}

export default PatientPage