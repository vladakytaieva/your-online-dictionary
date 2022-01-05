import {BrowserRouter as Switch, Route, Link} from "react-router-dom"
import { useState } from "react"

export default function Settings({ name, userId, update, logOut }) {
    const [newName, setNewName] = useState(name)
    const [newPassword, setNewPassword] = useState('')

    const submitChanges = (e) => {
        e.preventDefault()
        fetch('https://guarded-castle-07364.herokuapp.com/update-user', {
            method: "put",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: userId,
                name: newName,
                password: newPassword
            })
        })
        .then(res => res.json())
        .then(name => {
            update(name)
            setNewPassword('')
        })
    }

    const deleteAccount = () => {
        const confirmation = window.confirm("Are you sure you want to delete your account?")
        if (confirmation) {
            fetch('https://guarded-castle-07364.herokuapp.com/delete-user', {
                method: 'delete',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    id: userId
                })
            })
            .then(data => data.json())
            .then(res => logOut())
            .catch(console.log)
        }
    }

    return (
        <div className="container">
            <h1 style={{color: '#333'}}>Hello, {name}!!!</h1>
            <form id="account-form" onSubmit={submitChanges}>
                <h1>Manage account</h1>
                <label htmlFor="username">Name: </label>
                <input type="text" name="username" id="username" value={newName} onChange={(e) => {
                    setNewName(e.target.value)
                }}/>
                <br/>
                <label>New password: </label>
                <input type="password" name="username" id="username" value={newPassword} onChange={(e) => {
                    setNewPassword(e.target.value)
                }}/>
                <br/>
                <button className="btn submit ">Submit changes</button>
            </form>
            <button className="btn submit cancel" onClick={deleteAccount}>Delete account</button>
        </div>
    )
}