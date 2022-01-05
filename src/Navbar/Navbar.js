import {BrowserRouter as Switch, Route, Link} from "react-router-dom"
import "./Navbar.scss"

export default function Navbar({ logOut }) {
    return (
        <div className="navbar">
            <ul>
                <li>
                    <Link to="/home">
                        <span className="icon"><i className="material-icons">home</i></span>
                        <span className="title">Home</span>
                    </Link>
                </li>
                <li>
                    <Link to="/dictionary">
                        <span className="icon"><i className="material-icons">assignment</i></span>
                        <span className="title">Dictionary</span>
                    </Link>
                </li>
                <li>
                    <Link to="/test">
                        <span className="icon"><i className="material-icons">extension</i></span>
                        <span className="title">Test</span>
                    </Link>
                </li>
                <li>
                    <Link to="/manage-account">
                        <span className="icon"><i className="material-icons">settings</i></span>
                        <span className="title">Settings</span>
                    </Link>
                </li>
                <li>
                    <Link to="/signin" onClick={logOut}>
                        <span className="icon"><i className="material-icons">login</i></span>
                        <span className="title">Log Out</span>
                    </Link>
                </li>
            </ul>
        </div>
    )
}