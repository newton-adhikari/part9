import axios from "axios";
import { DiaryEntry, NewDiaryEntry } from "../types";
const baseUrl = "http://localhost:7009";

const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(`${baseUrl}/api/diaries`)
        .then(res => res.data);
}

const addDiaryEntry = (data: NewDiaryEntry) => {
    return axios
        .post<NewDiaryEntry>(`${baseUrl}/api/diaries`, data)
        .then(res => res.data);
}

export default {
    getAllDiaries,
    addDiaryEntry
}