import { useState, useEffect } from "react"
import "./Test.scss"

export default function Card({ word, correct, options, updateResult, getTarget}) {
    const [answer, setAnswer] = useState('')

    useEffect(() => {
        setAnswer('')
    }, [word])

    const compare = (e) => {
        getTarget(e.target)
        if (e.target.innerHTML === correct) {
            e.target.classList.add('green')
            if(!answer) {
                setAnswer('right')
                updateResult(1)
            }
        } else {
            e.target.classList.add('red')
            if (!answer) {
                setAnswer('wrong')
                updateResult(0)
            }
        }
    }

    return (
        <>
            <div className='center word'>{word}</div>
            <div className='options'>
                {options.map((el, idx) => {
                    return <button name={el} key={idx} className='cardel center' onClick={compare}>{el}</button>
                })}
            </div>
        </>
    )
}