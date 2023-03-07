import { useState, useEffect } from "react";
import diaryService from "./service/diaryService";
import { DiaryEntry } from "./types";
import DiaryEntries from "./components/DiaryEntries";

const App = () => {
  const [diaries, setAllDiaries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    diaryService.getAllDiaries()
      .then(res => setAllDiaries(res))
  }, [])

  return (
    <>
      <h1>Diary Entries</h1>
      <DiaryEntries allDiaryEntries={diaries} />
    </>
  )
}

export default App;