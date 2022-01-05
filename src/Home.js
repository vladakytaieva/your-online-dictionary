import {BrowserRouter as Switch, Route, Link} from "react-router-dom"
import { useState } from "react"

export default function Home({ name }) {
    

    return (
        <div className="container">
            <h1 style={{color: '#333', margin: '10px'}}>Hello, {name}!!!</h1>
            <div id="introduction">
                <p>In this app you can create your own dictionary and test your knowledge.</p>
                <p>Go to the <a href="/dictionary">"Dictionary"</a> tab and add new words to learn. Press the purple <a href="/dictionary/manage">settings button</a> on top to add tables and categories. Tables are meant to be languages you learn (e.g. English, German, French, etc) and with categories you can divide your words into logical groups like animals, people, plants, family or whatever you want. These are so that you can find needed words faster by applying filters (e.g. find all the words you have about environment in German).</p>
                <p>When you are ready to test your knowledge go to the <a href="/test">"Test"</a> tab, select words you want to test and press "Play". You can alo use filters in this tab.</p>
                <p>If you want to change your name or password you can do it in the <a href="/manage-account">"Settings"</a> tab.</p>
            </div>
        </div>
    )
}