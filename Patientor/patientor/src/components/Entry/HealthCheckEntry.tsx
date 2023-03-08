import { Entry, HealthCheckEntry as HCE } from "../../types";

interface Props {
    entry: HCE
}

const HealthCheckEntry = ({entry}: Props) => {
    const style = {
        border: "2px solid black",
        borderRadius: "8px",
        padding: "5px",
        margin: "5px"
    }
    return <div style={style}>
        <p>{entry.date} icon of {entry.type} </p>
        <p><i>{entry.description}</i></p>
        health check rating icon {entry.healthCheckRating}
        <p>diagnose by {entry.specialist}</p>
    </div>
}

export default HealthCheckEntry;