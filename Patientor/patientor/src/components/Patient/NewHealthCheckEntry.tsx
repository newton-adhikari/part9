import { useState } from "react";
import { EntryFormValues, HealthCheckRating, Patient } from "../../types";
import { createEntry } from "../../services/patients";

interface Props {
    id: string,
    setPatient: React.Dispatch<React.SetStateAction<Patient[]>>,
    patients: Patient[]
}

const NewHealthCheckEntry = ({id, patients, setPatient}: Props) => {
    const [description, setDescription] = useState("");
    const [date, setDate] = useState("");
    const [specialist, setSpecialist] = useState("");
    const [healthCheckRating, setRating] = useState<number>();
    const [codes, setCodes] = useState("")

    const createNewEntry = async (e: React.SyntheticEvent) => {
        // axios post request with type EntryFormValues

        e.preventDefault();
        const obj: EntryFormValues = {
            type: "HealthCheck",
            healthCheckRating: healthCheckRating as HealthCheckRating,
            description,
            date,
            specialist
        }
        
        const entry = await createEntry(id, obj);
        const patient = patients.find(p => p.id === id) as Patient;
        setPatient(patients.map(p => {
            if (p.id === id) {
                p.entries.push(entry);
                return p;
            }
            return p;
        }))
    }

    return <div>
        <h4>New health check entry</h4>
        <form onSubmit={createNewEntry}>
            Description <div>
            <input type="text" value={description} onChange={({target}) => setDescription(target.value)} />
            </div>
            Date <div>
                <input type="date" value={date} onChange={({target}) => setDate(target.value)} />
            </div>
            Specialist <div>
                <input type="text" value={specialist} onChange={({target}) => setSpecialist(target.value)} />
            </div>
            Healthcheck rating <div>
                <input type="number" value={healthCheckRating} onChange={({target}) => setRating(parseInt(target.value))} />
            </div>
            Diagnosis Codes <div>
                <input type="text" value={codes} onChange={({target}) => setCodes((target.value))} />
            </div>
            <button type="submit">add</button>
        </form>
    </div>
}

export default NewHealthCheckEntry;