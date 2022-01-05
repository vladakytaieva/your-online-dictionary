import {BrowserRouter as Switch, Route, Link, useHistory} from "react-router-dom"
import { useState, useEffect } from "react"
import Card from "./Card"
import Card2 from "./Card2"
import "./Test.scss"
import { shuffleArray, randomNum } from "../functions"

export default function Playground({ dict, allwords }) {
    const max = dict.length
    const [score, setScore] = useState(0)
    const [words, setWords] = useState(dict)
    const [word, setWord] = useState('')
    const [correct, setCorrect] = useState('')
    const [options, setOptions] = useState([])
    const [target, setTarget] = useState([])
    const [isFinished, setIsFinished] = useState(false)
    const history = useHistory()
    const [mode, setMode] = useState(1)
    const [prevmode, setPrevmode] = useState(1)
    // mode === 1 => Card: word - find translation
    // mode === 2 => Card: translation - find word
    // mode === 3 => Card2: collect word from letters

    const [testvar, setTestvar] = useState(false) // meaningless var to get new word after timeout

    useEffect(() => {
        if (dict.length === 0) {
            history.push('/test')
            return
        }
        let copy = [...dict]
        gameStart(copy)
    },[])

    useEffect(() => {
        getNextWord()
    }, [testvar])

    useEffect(() => {
        if (word !== '') {
            let opts = [correct]
            for (let i = 0; i < 3; i++) {
                let n = Math.floor(Math.random() * allwords.length)
                mode === 1 ? opts.push(allwords[n].translation) : opts.push(allwords[n].word)
            }
            opts = shuffleArray(opts)
            setOptions(opts)
            setPrevmode(mode)
            setMode(randomNum(3))
        }   
    }, [word])

    const getNextWord = () => {
        if (words.length !== 0) {
            let copy = [...words]
            let w = copy.shift()
            setWords(copy)
            if (mode === 1) {
                setWord(w.word)
                setCorrect(w.translation)
            } else if (mode === 2 || mode === 3) {
                setWord(w.translation)
                setCorrect(w.word)
            } 
            setTarget([])
            target.forEach(t => {
                t.classList.remove('red')
                t.classList.remove('green') 
            })
        } else {
            finishTest()
        }
    }

    const getAnswer = (res) => {
        setScore(score + res)
        return setTimeout(() => {
            setTestvar(!testvar)
        }, 1000)
    }

    const finishTest = () => {
        if (isFinished) {
            history.push('/test')
        } else {
            setIsFinished(true)
        }
    }

    const getTarget = (el) => {
        setTarget([...target, el])
    }

    const gameStart = (copy) => {
        let w = copy.shift()
        if (mode === 1) {
            setWord(w.word)
            setCorrect(w.translation)
        } else if (mode === 2) {
            setWord(w.translation)
            setCorrect(w.word)
        }
        setWords(copy)
    }

    const replayGame = () => {
        let copy = [...dict]
        gameStart(shuffleArray(copy))
        setScore(0)
        setIsFinished(false)
    }

    const renderComponents = () => {
        if (prevmode === 1 || prevmode === 2) {
            return <Card word={word} correct={correct} options={options} updateResult={getAnswer} getTarget={getTarget}/>
        } else if (prevmode === 3) {
            return <Card2 word={word} correct={correct} updateResult={getAnswer}/>
        }
    }

    return (
        <div className='container flex'>
            <div className="score">
                <p>
                    Score: {score}/{dict.length}
                </p>
                <div className="btns">
                    <button className="btn submit" onClick={getNextWord}>Next</button>
                    <button className="btn submit" onClick={finishTest}>Finish</button>
                </div>
            </div>
            <div className="test">
                
                {!isFinished ?
                    renderComponents()
                : 
                    <>
                        <p>You got {(score / dict.length * 100).toFixed(2)}% right answers.</p>
                        <button className="btn submit cancel2" onClick={replayGame}>Play again</button>
                    </>  
                
                }
            </div>
        </div>
    )
}