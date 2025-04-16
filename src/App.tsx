import { useState, useEffect } from 'react'
import { wordList } from './data/wordList'
import Wordle from './components/Wordle'
import Instructions from './components/Instructions'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  const [solution, setSolution] = useState<string | null>(null)
  console.log('solution is:', solution)

  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setSolution(randomWord.toLowerCase())
  }, [])
  return (
    <>
      <div className="App">
        <h1 className="wordle-logo">Wordle</h1>
        <Instructions />
        {solution && <Wordle solution={solution} />}
      </div>
      <ToastContainer position="top-right" autoClose={1000} />
    </>
  )
}

export default App
