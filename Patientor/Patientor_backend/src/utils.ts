import { Patient, Gender, Entry, Diagnose, BaseEntry, HealthCheckRating } from "./types";
import { v1 as uuid } from "uuid";

const isString = (text: unknown): text is string=> {
    return typeof text === "string" || text instanceof String;
}

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
}

const isSsn = (text: string): boolean => {
    return text.split("").includes("-");
}

const isGender = (text: string): text is Gender => {
    return Object.values(Gender).map(v => v.toString()).includes(text);
}

const parseName = (text: unknown): string => {
    if (!text || !isString(text))
        throw new Error("Missing name or wrong type");

    return text;
}

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date))
        throw new Error("Missing date or incorrect date");

    return date;
}

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn) || !isSsn(ssn))
        throw new Error("Missing ssn or invalid type");

    return ssn;
}

const parseGender = (gen: unknown): Gender => {
    if (!gen || !isString(gen) || !isGender(gen))
        throw new Error("Missing gender or incorrect gender");

    return gen;
}

const parseOccupation = (occ: unknown): string => {
    if (!occ || !isString(occ))
        throw new Error("Missing occupation or invalid data");

    return occ;
}

const parseSpecialist = (spec: unknown): string => {
    if (!spec || !isString(spec))
        throw new Error("specialist must be provided");

    return spec;
}

const parseDescription = (spec: unknown): string => {
    if (!spec || !isString(spec))
        throw new Error("description must be provided");

    return spec;
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnose['code']> =>  {
    if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
      // we will just trust the data to be in correct form
      
      return [] as Array<Diagnose['code']>;
    }
  
    return object.diagnosisCodes as Array<Diagnose['code']>;
  };

const toNewPatient = (object: unknown): Patient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object && "entries" in object) {
        const newPatient: Patient = {
            id: uuid(),
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation),
            entries: object.entries as Entry[]
        }

        return newPatient;
    }

    throw new Error("invalid data received");
}

export const toNewEntry = (object: unknown): Entry => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ("date" in object && "specialist" in object && "description" in object && "type" in object) {
        const toRet: BaseEntry = {
            id: uuid(),
            date: parseDate(object.date),
            specialist: parseSpecialist(object.specialist),
            description: parseDescription(object.description),
            diagnosisCodes: parseDiagnosisCodes(object)
        }

        switch(object.type) {
            case "Hospital":{
                if ("healthCheckRating" in object) {
                    let hcr: HealthCheckRating = object.healthCheckRating as HealthCheckRating;
                    return {...toRet,type: object.type, healthCheckRating: hcr};
                }
                break;
            }
            case "HealthCheck": {
                if ("healthCheckRating" in object) {
                    let hcr: HealthCheckRating = object.healthCheckRating as HealthCheckRating;
                    return {...toRet, type: object.type, healthCheckRating: hcr}
                }
                break;
            }
    
            case "OccupationalHealthcare": {
                if ("healthCheckRating" in object && "employerName" in object) {
                    let hcr: HealthCheckRating = object.healthCheckRating as HealthCheckRating;
                    return {...toRet, type: object.type, healthCheckRating: hcr, employerName: object.employerName as string}
                }
                break;
            }
        }
        throw new Error("type not present"); 

    }
    throw new Error("invalid data received"); 
}

export default toNewPatient;