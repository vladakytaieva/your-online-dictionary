import { useState, useEffect } from "react"
import { shuffleArray } from "../functions"
import "./Test.scss"

export default function Card({ word, correct, updateResult}) {
    const [answer, setAnswer] = useState('')
    const [btns, setBtns] = useState([])
    const [spliced, setSpliced] = useState([])

    useEffect(() => {
        const splitted = correct.split('')
        const shuffled = shuffleArray(splitted)
        setBtns(shuffled)
    }, [word])

    const compare = () => {
        setBtns([])
        if (answer === correct) {
            updateResult(1)
        } else {
            updateResult(0)
        }
        setAnswer('')
    }

    const pickLetter = (e) => {
        const el = e.target
        setAnswer(answer + el.innerHTML)
        const list = [...btns]
        const arr = [...spliced]
        arr.push(list.splice(el.id, 1))
        setBtns(list)
        setSpliced(arr)
    }

    const returnLetter = () => {
        const str = answer
        const list = [...btns]
        const arr = [...spliced]
        if (str.length > 0) {
            setAnswer(str.slice(0,-1))
            list.push(arr.pop())
            setBtns(list)
            setSpliced(arr)
        }
    }

    return (
        <>
            <div className='center word'>{word}</div>

            <div className='center flex'>
                <p className="answer-placeholder flex">{answer}</p>
                <br/>
                <div>
                    {btns.length === 0 
                    ? <button onClick={compare} className="btn submit cancel2 margin">Check</button>
                    :
                    btns.map((el, idx) => {
                        return <button key={idx} id={idx} onClick={pickLetter} className="btn submit margin">{el}</button>
                    })
                    }
                    <button className="btn submit cancel2" onClick={returnLetter}>&#x21A9;&#xFE0E;</button>
                </div>
            </div>
        </>
    )
}