import {BrowserRouter as Switch, Route, useHistory} from "react-router-dom"
import WordTableElement from "./WordTableElement"
import './Test.scss'
import { useState, useEffect } from "react"
import { shuffleArray } from "../functions"

export default function Test({ dict, filter, tables, categories }) {
    const history = useHistory()
    const [chosen, setChosen] = useState(new Array())
    const [dictW, setDictW] = useState(dict)
    const [tableName, setTableName] = useState('All')
    const [categoryName, setCategoryName] = useState('All')
    let idxs = []

    useEffect(() => {
        if (categoryName !== 'All') {
            if (tableName !== 'All') {
                const filtered = dict.filter(w => w.category === categoryName && w.tablename === tableName)
                setDictW(filtered)
            } else {
                const filtered = dict.filter(w => w.category === categoryName)
                setDictW(filtered)
            }
        } else {
            if (tableName !== 'All') {
                const filtered = dict.filter(w => w.tablename === tableName)
                setDictW(filtered)
            } else {
                setDictW(dict)
            }
        }
    }, [categoryName, tableName])

    function chooseWord(e) {
        let num = Number(e.target.name)
        if (e.target.checked) {
            if (chosen.indexOf(num) === -1) {
                idxs = chosen.concat([num])
                setChosen(idxs)
            }
        } else {
            if (chosen.indexOf(num) !== -1) {
                idxs = chosen.filter(x => x !== num)
                setChosen(idxs)
            }
        }
    }

    function submitChosen() {
        if (chosen.length > 0) {
            let flt = chosen.map(i => dictW[i])
            filter(shuffleArray(flt))
            history.push("/test/start")
        } else {
            alert('You need to choose words to test!')
        }
    }

    return (
        <div className='container flex'>
            <div className="filter">
                <div className="selector">
                    <span>Table: </span>
                    <select name="tables" id="tables" onChange={(e) => setTableName(e.target.value)}>
                        <option>All</option>
                        {tables.map((el, idx) => {
                                return <option key={idx}>{el}</option>
                            })}
                    </select>
                    <span>Category: </span>
                    <select name="categories" id="categories" onChange={(e) => setCategoryName(e.target.value)}>
                        <option>All</option>
                        {categories.map((el, idx) => {
                            return <option key={idx}>{el}</option>
                        })}
                    </select>
                </div>
            </div>
            <div className='scroll container'>
                <table>
                    <thead>
                        <tr>
                            <th style={{width: '30px'}}>✔</th>
                            <th>Word</th>
                            <th>Transcription</th>
                            <th>Translation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dictW.map((word, idx) => {
                                return <WordTableElement word={word} id={idx} key={idx} check={chooseWord}/>
                        })}
                    </tbody>
                </table>
            </div>
            <div className='footer'>
                <button className="btn submit" onClick={submitChosen}>Start</button>
            </div>
        </div>
    )
}