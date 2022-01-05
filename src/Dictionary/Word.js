import {BrowserRouter as Switch, Route, Link} from "react-router-dom"

export default function Word({ word, id }) {
    return (
        <tr>
            <td>{id + 1}</td>
            <td>{word.word}</td>
            <td>{word.transcription}</td>
            <td>{word.translation}</td>
            <td><Link to={`dictionary/edit/${id}`}><i className="material-icons">border_color</i></Link></td>
        </tr>
    )
}