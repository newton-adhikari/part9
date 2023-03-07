import { useState, useEffect, Fragment } from "react";
import diaryService from "./service/diaryService";
import { DiaryEntry } from "./types";
import DiaryEntries from "./components/DiaryEntries";
import { Visibility, Weather } from "./types";
import Notification from "./components/Notification";
import axios from "axios";

const App = () => {
  const [diaries, setAllDiaries] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState("");
  const [dvisibility, setVisibility] = useState("");
  const [dweather, setWeather] = useState("");
  const [comment, setCommeent] = useState("");
  const [error, setError] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    diaryService.getAllDiaries()
      .then(res => setAllDiaries(res))
  }, [])

  const addNewEntry = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let weather = dweather as Weather;
    let visibility = dvisibility as Visibility;

    const newDiaryEntry = {
      date,
      visibility,
      weather,
      comment
    }

    diaryService.addDiaryEntry(newDiaryEntry)
      .then(res => setAllDiaries(diaries.concat(res as DiaryEntry)))
      .catch(error => {
        if (axios.isAxiosError(error)) {
          if (error.response) {
            setError(true);
            setMessage(error.response.data);

            setTimeout(() => {
              setError(false);
            }, 5000)
          };
        } else {
          setMessage(error.message);
        }
      })

      setDate("");
      setVisibility("great");
      setWeather("sunny");
      setCommeent("");
  }

  const getWeather = () => <>weather {Object.values(Weather).map(w => {
    return <Fragment key={w}>
      <label htmlFor={w}>{w}</label>
      <input type="radio" id={w} name="weather" value={w} onChange={({target}) => setWeather(target.value)} />
    </Fragment>
  })}</>

  const getVisibility = () => <>visibility {Object.values(Visibility).map(w => {
    return <Fragment key={w}>
      <label htmlFor={w}>{w} k</label>
      <input type="radio" id={w} name="visiblity" value={w} onChange={({target}) => setVisibility(target.value)} />
    </Fragment>
  })}</>

  return (
    <>
      <h2>Add new entry</h2>
      {error? <Notification text={message} /> : null}
      <form onSubmit={addNewEntry}>
        {getWeather()}
        <br />
        {getVisibility()}
        <div>date <input value={date} onChange={({target}) => setDate(target.value)} type="date" /></div>
        <div>comment <input value={comment} onChange={({target}) => setCommeent(target.value)} type="text" /></div>
        <button type="submit">add</button>
      </form>
      <h1>Diary Entries</h1>
      <DiaryEntries allDiaryEntries={diaries} />
    </>
  )
}

export default App;