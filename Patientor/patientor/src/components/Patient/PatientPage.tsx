import {Diagnose, Patient} from "../../types";
import { useParams } from "react-router-dom";
import EntryPage from "../Entry/EntryPage";
import NewHealthCheckEntry from "./NewHealthCheckEntry";

interface props {
    setPatient: React.Dispatch<React.SetStateAction<Patient[]>>,
    patients: Patient[],
    codes: Diagnose[]
}

const PatientPage = ({patients, setPatient, codes}: props) => {
    const id = useParams().id as string;
    const patient: Patient = patients.find(p => p.id === id) as Patient;

    return <>
        <h2>{patient.name}</h2>
        <p>ssn {patient.ssn}</p>
        <p>occupation {patient.occupation}</p>
        <h3>entries</h3>
        <NewHealthCheckEntry id={id} patients={patients} setPatient={setPatient} />
        {patient.entries.map(e => {
            return <EntryPage key={e.id} entry={e} />
            // return <div key={e.id}>
            //     <p>{e.date} {e.description}</p>
            //     <ul>
            //         {e.diagnosisCodes?.map(c => <li key={c}>{c} {codes.filter(co => co.code === c)[0].name}</li>)}
            //     </ul>
            // </div>
        })}
    </>
}

export default PatientPage