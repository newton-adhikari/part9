import { Patient, Gender } from "./types";
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

const toNewPatient = (object: unknown): Patient => {
    if ( !object || typeof object !== 'object' ) {
        throw new Error('Incorrect or missing data');
    }

    if ("name" in object && "dateOfBirth" in object && "ssn" in object && "gender" in object && "occupation" in object) {
        const newPatient: Patient = {
            id: uuid(),
            name: parseName(object.name),
            dateOfBirth: parseDate(object.dateOfBirth),
            ssn: parseSsn(object.ssn),
            gender: parseGender(object.gender),
            occupation: parseOccupation(object.occupation)
        }

        return newPatient;
    }

    throw new Error("invalid data received");
}

export default toNewPatient;