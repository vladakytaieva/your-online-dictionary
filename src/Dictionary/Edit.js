import {BrowserRouter as Switch, Route, Link, useHistory, useRouteMatch} from "react-router-dom"
import { useState } from "react"
import "./Dictionary.scss"
import { useEffect } from "react"

export default function Edit({ location, userDict, userId, updateDict, tables, categories }) {
    let match = useRouteMatch()
    const { params: { wordId } } = match
    const selectedWord = userDict[wordId]
    const [word, setWord] = useState(selectedWord.word)
    const [transcription, setTranscription] = useState(selectedWord.transcription)
    const [translation, setTranslation] = useState(selectedWord.translation)
    const [category, setCategory] = useState(selectedWord.category)
    const [tableName, setTableName] = useState(selectedWord.tablename)
    const [link, setLink] = useState('')
    const history = useHistory()

    const handleSubmit = (e) => {
        e.preventDefault()
        fetch(`https://guarded-castle-07364.herokuapp.com/dictionary/${link}`, {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: userId,
              wid: selectedWord.id,
              word: word,
              transcription: transcription,
              translation: translation,
              category: category,
              tableName: tableName
            })
        })
            .then(response => response.json())
            .then(dict => {
                console.log(dict)
                updateDict(dict)
            })   
            .catch(console.log) 
        history.push("/dictionary")
    }

    return (
        <div className="container flex">
            <form onSubmit={handleSubmit} className="add">
                <label htmlFor="word" className="lbl">Word</label><br/>
                <input 
                    type="text" 
                    name="word" 
                    id="word" 
                    value={word} 
                    onChange={(e) => setWord(e.target.value)} 
                    className="inp"
                /><br/>
                <label htmlFor="transcription" className="lbl">Transcription</label><br/>
                <input 
                    type="text" 
                    name="transcription" 
                    id="transcription" 
                    value={transcription} 
                    onChange={(e) => setTranscription(e.target.value)} 
                    className="inp"
                /><br/>
                <label htmlFor="translation" className="lbl">Translation</label><br/>
                <input 
                    type="text" 
                    name="translation" 
                    id="translation" 
                    value={translation} 
                    onChange={(e) => setTranslation(e.target.value)} 
                    className="inp"
                /><br/>
                <label htmlFor="tables" className="lbl">Table: </label>
                <select name="tables" id="tables" onChange={(e) => setTableName(e.target.value)} value={tableName}>
                        <option>None</option>
                        {tables.map(el => {
                            return <option>{el}</option>
                        })}
                </select><br/>
                <label htmlFor="category" className="lbl">Category: </label>
                <select name="category" id="category" onChange={(e) => setCategory(e.target.value)} value={category}>
                        <option>None</option>
                        {categories.map(el => {
                            return <option>{el}</option>
                        })}
                </select><br/>
                <button className="btn submit" onClick={() => setLink('edit')}>Apply</button>
                <button className="btn submit cancel" onClick={() => setLink('delete')}>Delete</button>
                <Link to="/dictionary" className="btn submit cancel2">Cancel</Link>
            </form>
        </div>
    )
}