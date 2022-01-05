import {BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom"
import { useState } from "react/cjs/react.development"
import './Signin.scss'

export default function Register({ onSignSubmit}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [warning, setWarning] = useState('')

    const history = useHistory()
    
    const onSignIn = (e) => {
        e.preventDefault()
        fetch('https://guarded-castle-07364.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                password: password,
                name: name
            })
        })
        .then(response => response.json())
        .then(user => {
            console.log(user)
            if (typeof user === "string") {
                setWarning(user)
            } else {
                onSignSubmit(user.id, user.name, [])
                console.log('success')
                localStorage.setItem('userName', user.name)
                localStorage.setItem('userId', user.id)
                localStorage.setItem('userDict', JSON.stringify([]))
                history.push('/home')
                window.location.reload()
            }
        })
        .catch(console.log)
    }

    return (
        <div className="container flex">
            <form className='add form' onSubmit={onSignIn}>
                <label htmlFor='name' className="lbl">Name</label><br/>
                <input 
                    type='text' 
                    name='name' 
                    id='name' 
                    className="inp" 
                    onChange={(e) => setName(e.target.value)}
                    required
                /><br/>
                <label htmlFor='email' className="lbl">Email</label><br/>
                <input 
                    type='email' 
                    name='email' 
                    id='email' 
                    className="inp" 
                    onChange={(e) => setEmail(e.target.value)}
                    required
                /><br/>
                <label htmlFor='password' className="lbl">Password</label><br/>
                <input 
                    type='password' 
                    name='password' 
                    id='password' 
                    className="inp" 
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button className="btn submit">Log In</button>
                <span className="warning">{warning}</span>
                <Link to={`/signin`}>Already have an account? Log in</Link>  
            </form>
        </div>
    )
}