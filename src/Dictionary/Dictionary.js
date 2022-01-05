import {BrowserRouter as Switch, Route, Link, useRouteMatch} from "react-router-dom"
import { useEffect, useState } from "react"
import "./Dictionary.scss"
import Word from "./Word"


export default function Dictionary({ userDict, tables, categories }) {
    let match = useRouteMatch()
    console.log(userDict)
    const [dict, setDict] = useState(userDict)
    const [tableName, setTableName] = useState('All')
    const [categoryName, setCategoryName] = useState('All')

    useEffect(() => {
        if (categoryName !== 'All') {
            if (tableName !== 'All') {
                const filtered = userDict.filter(w => w.category === categoryName && w.tablename === tableName)
                setDict(filtered)
            } else {
                const filtered = userDict.filter(w => w.category === categoryName)
                setDict(filtered)
            }
        } else {
            if (tableName !== 'All') {
                const filtered = userDict.filter(w => w.tablename === tableName)
                setDict(filtered)
            } else {
                setDict(userDict)
            }
        }
    }, [categoryName, tableName])

    return (
        <div className="container flex">
            <div className="filter">
                <div className="selector">
                    <span>Table: </span>
                    <select name="tables" id="tables" onChange={(e) => setTableName(e.target.value)}>
                        <option>All</option>
                        {tables.map((el, idx ) => {
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
                <Link to={`${match.url}/manage`} className="btn submit cancel2 manager"><span className="icon"><i className="material-icons">settings</i></span></Link>
            </div>
            <div className='scroll container'> 
                <table>
                    <thead>
                        <tr>
                            <th style={{width: "20px"}}>№</th>
                            <th>Word</th>
                            <th>Transcription</th>
                            <th>Translation</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {dict.map((word, idx) => {
                                return <Word word={word} key={idx} id={idx}/>
                        })}
                        
                    </tbody>
                </table>
            </div>
                {dict.length === 0 && <><br/><p>Looks like you don't have any words yet. Add some to start learning!</p></>}

            <Link to={`${match.url}/add`} className="btn">Add</Link>          
        </div>
    )
}