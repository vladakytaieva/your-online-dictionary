import {BrowserRouter as Switch, Route, Link, useHistory} from "react-router-dom"
import { useState } from "react"
import "./Dictionary.scss"

export default function ManageTables ({ tables, categories, userId, catSetter, tabSetter }) {
    const [newCategory, setNewCategory] = useState("")
    const [newTable, setNewTable] = useState("")
    const [link, setLink] = useState('')
    const categoriesList = categories.join(', ')
    const tablesList = tables.join(', ')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (link === 'manage' && ((e.target.name === 'categories' && categories.includes(e.target[0].value)) || (e.target.name === 'tables' && tables.includes(e.target[0].value)))) {
            
        } else {
            fetch(`https://guarded-castle-07364.herokuapp.com/dictionary/${link}`, {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: userId,
                    name: e.target.name,
                    value: e.target[0].value
                })
            })
            .then(response => response.json())
            .then(res => {
                e.target.name === 'categories' ? catSetter(res) : tabSetter(res)
            }) 
            .catch(console.log)
        }
        setNewCategory('')
        setNewTable('')
    }

    return (
        <div className="container flex">
            <div className="link-holder">
                <Link to="/dictionary" className="btn submit cancel2">Back</Link>
            </div>
            <div className="data-forms">
                <p>Your tables:</p>
                <p>{tablesList}</p>
                <form onSubmit={handleSubmit} name="tables">
                    <input type="text" name="newTable" id="newTable" className="inp" value={newTable} onChange={(e) => setNewTable(e.target.value)}/>
                    <button className="btn submit" onClick={() => setLink('manage')}>Add</button>
                    <button className="btn submit cancel" onClick={() => setLink('delete-data')}>Delete</button>
                </form>
            </div>
            <div className="data-forms">
                <p>Your categories:</p>
                <p>{categoriesList}</p>
                <form onSubmit={handleSubmit} name="categories">
                    <input type="text" name="newCategory" id="newCategory" className="inp" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                    <button className="btn submit" onClick={() => setLink('manage')}>Add</button>
                    <button className="btn submit cancel" onClick={() => setLink('delete-data')}>Delete</button>
                </form>
            </div>
        </div>
    )
}