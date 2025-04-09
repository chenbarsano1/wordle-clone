import { useState, useEffect } from 'react'
import { wordList } from './data/wordList'
import Wordle from './components/Wordle'

function App() {
  const [solution, setSolution] = useState<string | null>(null)
  console.log('solution is:', solution)

  useEffect(() => {
    const randomWord = wordList[Math.floor(Math.random() * wordList.length)]
    setSolution(randomWord.toLowerCase())
    console.log('random word is:', randomWord)
  }, [])
  return (
    <>
      <div className="App">
        <h1 className='wordle-logo'>Wordle</h1>
        {solution && <Wordle solution={solution} />}
      </div>
    </>
  )
}

export default App
