import { Entry } from "../../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

interface Props {
    entry: Entry
}

const EntryPage = ({entry}: Props) => {
    switch(entry.type) {
        case "Hospital":
            return <HospitalEntry entry={entry} />

        case "HealthCheck":
            return <HealthCheckEntry entry={entry} />

        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry entry={entry} />
        default:
            return <p>this is entry</p>        
    }
}

export default EntryPage;