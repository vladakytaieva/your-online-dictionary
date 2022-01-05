import {BrowserRouter as Router, Switch, Route, Link, useHistory, BrowserRouter, Redirect} from "react-router-dom"
import { useState } from "react"
import Dictionary from "./Dictionary/Dictionary";
import Home from "./Home"
import Navbar from "./Navbar/Navbar"
import AddNew from "./Dictionary/AddNew"
import Test from "./Test/Test"
import Signin from "./Signin/Signin";
import Register from "./Signin/Register";
import Playground from './Test/Playground'
import Edit from "./Dictionary/Edit";
import ManageTables from "./Dictionary/ManageTables";
import { useEffect } from "react/cjs/react.development";

function App() {
  const [user, setUser] = useState({
    id: localStorage.getItem('userId'),
    name: localStorage.getItem('userName'),
    dict: JSON.parse(localStorage.getItem('userDict'))
  })
  const [filtered, setFiltered] = useState([])
  const [categories, setCategories] = useState([])
  const [tables, setTables] = useState([])

  useEffect(() => {
    if (user.id) {
      fetch(`https://guarded-castle-07364.herokuapp.com/dictionary/getdata`, {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          id: user.id
        })
    })
      .then(resp => resp.json())
      .then(data => {
        setCategories(data.categories)
        setTables(data.tables)
      })
      .catch(console.log)
    }
  }, [user.id])

  const onSignSubmit = () => {
    setUser({
      id: localStorage.getItem('userId'),
      name: localStorage.getItem('userName'),
      dict: JSON.parse(localStorage.getItem('userDict'))
    })
  }

  const logOut = () => {
    localStorage.clear()
    setUser({
      id: null,
      name: '',
      dict: []
    })
    setCategories([])
    setTables([])
  }

  const updateDict = (w) => {
    const updated = JSON.stringify(w)
    localStorage.setItem('userDict', updated)
    setUser({...user, dict: w})
    window.location.reload()
  }

  const filterWords = (dict) => {
    setFiltered(dict)
  }

  const updateUserName = (name) => {
    setUser({
      ...user,
      name
    })
  }
  
  return (
    <Router>
      {user.id ? 
      <>
        <Navbar logOut={logOut}/> 
      </>
      : <Redirect to='/signin'/>}
     
      <Switch>
        <Route path='/register'>
          <Register onSignSubmit={onSignSubmit}/>
        </Route>
        <Route path='/signin'>
          <Signin onSignSubmit={onSignSubmit}/>
        </Route>
        <Route path="/dictionary/add">
          <AddNew updateDict={updateDict} userId={user.id} tables={tables} categories={categories}/>
        </Route>
        <Route exact path="/dictionary/edit/:wordId">
          <Edit userDict={user.dict} userId={user.id} updateDict={updateDict} tables={tables} categories={categories}/>
        </Route>
        <Route path="/dictionary/manage">
          <ManageTables tables={tables} categories={categories} userId={user.id} catSetter={val => setCategories(val)} tabSetter={val => setTables(val)}/>
        </Route>
        <Route path="/dictionary">
          <Dictionary userDict={user.dict} tables={tables} categories={categories}/>
        </Route>
        <Route path="/test/start">
          <Playground dict={filtered} allwords={user.dict}/>
        </Route>
        <Route path="/test">
          <Test dict={user.dict} filter={filterWords} tables={tables} categories={categories}/>
        </Route>
        <Route exact path="/home">
          <Home name={user.name} userId={user.id} update={updateUserName} logOut={logOut}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
