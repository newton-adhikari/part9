import axios from "axios";
import { DiaryEntry } from "../types";
const baseUrl = "http://localhost:7009";

const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(`${baseUrl}/api/diaries`)
        .then(res => res.data);
}

const addDiaryEntry = (data: DiaryEntry) => {
    return axios
        .post<DiaryEntry>(`${baseUrl}/api/diaries`, data)
        .then(res => res.data);
}

export default {
    getAllDiaries,
    addDiaryEntry
}