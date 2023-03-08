import { Entry, OccupationalHealthcareEntry as OHE } from "../../types";

interface Props {
    entry: OHE
}

const OccupationalHealthcareEntry = ({entry}: Props) => {
    const style = {
        border: "2px solid black",
        borderRadius: "8px",
        padding: "5px",
        margin: "5px"
    }
    console.log(entry.employerName);
    return <div style={style}>
        <p>{entry.date} icon of {entry.type} <i>{entry.employerName}</i></p>
        <p><i>{entry.description}</i></p>
        {entry.healthCheckRating ? <span>health check rating icon {entry.healthCheckRating}</span> : null}
        <p>diagnose by {entry.specialist}</p>
    </div>

}

export default OccupationalHealthcareEntry;