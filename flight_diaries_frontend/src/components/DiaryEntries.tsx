import { DiaryEntry } from "../types"

interface DiaryEntryArray {
    allDiaryEntries: DiaryEntry[]
}

const DiaryEntries = (props: DiaryEntryArray) => {
    console.log(props.allDiaryEntries);
    return <>{props.allDiaryEntries.map(d => {
        return <div key={d.id}>
            <h2>{d.date}</h2>
            <p>Visibility {d.visibility}</p>
            <p>Weather {d.weather}</p>
        </div>
    })}</>
}

export default DiaryEntries