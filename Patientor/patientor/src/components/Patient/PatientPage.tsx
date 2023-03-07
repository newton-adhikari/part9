import {Diagnose, Patient} from "../../types";
import { useParams } from "react-router-dom";

interface props {
    patients: Patient[],
    codes: Diagnose[]
}

const PatientPage = ({patients, codes}: props) => {
    const id = useParams().id as string;
    const patient: Patient = patients.find(p => p.id === id) as Patient;

    return <>
        <h2>{patient.name}</h2>
        <p>ssn {patient.ssn}</p>
        <p>occupation {patient.occupation}</p>
        <h3>entries</h3>
        {patient.entries.map(e => {
            return <div key={e.id}>
                <p>{e.date} {e.description}</p>
                <ul>
                    {e.diagnosisCodes?.map(c => <li key={c}>{c} {codes.filter(co => co.code === c)[0].name}</li>)}
                </ul>
            </div>
        })}
    </>
}

export default PatientPage