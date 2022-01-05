import {BrowserRouter as Switch, Route, Link, useHistory} from "react-router-dom"
import { useState } from "react"
import "./Dictionary.scss"

export default function AddNew({ updateDict, userId, tables, categories }) {
    const [word, setWord] = useState('')
    const [transcription, setTranscription] = useState('')
    const [translation, setTranslation] = useState('')
    const [category, setCategory] = useState('')
    const [tableName, setTableName] = useState('')
    const history = useHistory()

    
    const handleSubmit = (e) => {
        e.preventDefault()
        fetch('https://guarded-castle-07364.herokuapp.com/dictionary/add', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: userId,
              word: word.trim(),
              transcription: transcription.trim(),
              translation: translation.trim(),
              category: category,
              tableName: tableName
            })
        })
            .then(response => response.json())
            .then(dict => {
                updateDict(dict)
            })
            .catch(console.log)    
        history.push("/dictionary")
    }

    return (
        <div className="container flex">
            <form onSubmit={handleSubmit} className="add">
                <label htmlFor="word" className="lbl">Word</label><br/>
                <input type="text" name="word" id="word" value={word} onChange={(e) => setWord(e.target.value)} className="inp"/><br/>
                <label htmlFor="transcription" className="lbl">Transcription</label><br/>
                <input type="text" name="transcription" id="transcription" value={transcription} onChange={(e) => setTranscription(e.target.value)} className="inp"/><br/>
                <label htmlFor="translation" className="lbl">Translation</label><br/>
                <input type="text" name="translation" id="translation" value={translation} onChange={(e) => setTranslation(e.target.value)} className="inp"/><br/>
                <label htmlFor="tables" className="lbl">Table: </label>
                <select name="tables" id="tables" onChange={(e) => setTableName(e.target.value)}>
                        <option>None</option>
                        {tables.map(el => {
                            return <option>{el}</option>
                        })}
                </select><br/>
                <label htmlFor="category" className="lbl">Category: </label>
                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)}>
                        <option>None</option>
                        {categories.map(el => {
                            return <option>{el}</option>
                        })}
                </select><br/>
                <button className="btn submit">Add</button>
                <Link to="/dictionary" className="btn submit cancel">Cancel</Link>
            </form>
        </div>
    )
}