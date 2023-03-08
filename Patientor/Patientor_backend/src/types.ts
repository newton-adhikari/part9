export type DiagnoseWithoutLatin = Omit<Diagnose, "latin">;

export type PatientWithoutSSN = Omit<Patient, "ssn" | "entries">;

export enum Gender {
    Male = "male",
    Female = "female",
    Other = "other"
};

export interface Diagnose {
    code: string,
    name: string,
    latin?: string
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<Diagnose['code']>;
}

export enum HealthCheckRating {
    "Healthy" = 0,
    "LowRisk" = 1,
    "HighRisk" = 2,
    "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
    type: "Hospital",
    discharge?: {
        date: string,
        criteria: string
    },
    healthCheckRating?: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
    type: "OccupationalHealthcare",
    employerName: string,
    sickLeave?: {
        startDate: string,
        endDate: string
    },
    healthCheckRating?: HealthCheckRating 
}

type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<T, K> : never;
// Define Entry without the 'id' property
export type EntryToBeReturned = UnionOmit<Entry, 'type'>;

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: Gender,
    occupation: string,
    entries: Entry[]
}