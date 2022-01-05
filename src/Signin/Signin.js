import {BrowserRouter as Router, Switch, Route, Link, useHistory} from "react-router-dom"
import { useState } from "react"
import './Signin.scss'
import { useEffect } from "react/cjs/react.development"

export default function Signin({ onSignSubmit}) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [warning, setWarning] = useState({visibility: 'collapse'})

    const history = useHistory()

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            history.push("/home")
        }
    })

    const onSignIn = (e) => {
        console.log('signing in')
        e.preventDefault()
        fetch('https://guarded-castle-07364.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              email: email,
              password: password
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.name) {
                    console.log('success')
                    setWarning({visibility: 'collapse'})
                    localStorage.setItem('userName', user.name)
                    localStorage.setItem('userId', user.id)
                    localStorage.setItem('userDict', JSON.stringify(user.dict))
                    onSignSubmit()
                    history.push('/home')
                } else {
                    setWarning({visibility: 'visible'})
                }
            })
            .catch(console.log)
    }

    return (
        <div className="container flex">
            <form className='add form' onSubmit={onSignIn}>
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
                <p className='warning' style={warning}>Invalid password or email!</p>
                <Link to={`/register`}>Do not have an account yet?</Link>  
            </form>
        </div>
    )
}