import {BrowserRouter as Switch, Route, Link} from "react-router-dom"

export default function Word({ word, id, check }) {
    return (
        <tr>
            <td><label className="label"><input type='checkbox' id={id} name={id} className="label" style={{width: '30px'}} onClick={check}/></label></td>
            <td><label htmlFor={id} className="label">{word.word}</label></td>
            <td>{word.transcription}</td>
            <td>{word.translation}</td>
        </tr>
    )
}