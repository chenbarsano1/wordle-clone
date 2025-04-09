import { useState } from 'react'

const useWordle = (solution: String) => {
  const [turn, setTurn] = useState<number>(0)
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guesses, setGuesses] = useState<string[][]>([])
  const [history, setHistory] = useState<string[]>(['hello', 'ninja'])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)

  type LetterObject = {
    key: string
    color: 'grey' | 'green' | 'yellow'
  }

  const formatGuess = (): LetterObject[] => {
    const solutionArray = [...solution] // array of solution letters
    const formattedGuess: LetterObject[] = [...currentGuess].map((letter) => {
      return { key: letter, color: 'grey' }
    })

    // first pass - find green letters
    formattedGuess.forEach((letter, index) => {
      if (solution[index] === letter.key) {
        formattedGuess[index].color = 'green'
        solutionArray[index] = '' // mark it as used
      }
    })

    // second pass - find yellow letters
    formattedGuess.forEach((letter, index) => {
      if (solutionArray.includes(letter.key) && letter.color !== 'green') {
        formattedGuess[index].color = 'yellow'
        solutionArray[solutionArray.indexOf(letter.key)] = '' // mark it as used
      }
    })

    return formattedGuess
  }

  // handle keyup event and track current guess
  // if user presses enter, add the new guess to the guesses array
  // if user presses backspace, remove the last letter from the current guess
  const handleKeyup = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      // only add guess if the game is not over
      if (turn > 5) {
        console.log('You have used all your guesses')
        return
      }
      // do not allow duplicate guesses
      if (history.includes(currentGuess)) {
        console.log('You have already guessed that word')
        return
      }
      // check word is 5 letters long
      if (currentGuess.length !== 5) {
        console.log('Word must be 5 letters long')
        return
      }
      const formatted = formatGuess()
      console.log(formatted)
    }

    if (key === 'Backspace') {
      setCurrentGuess((prev) => prev.slice(0, -1))
      return
    }

    if (/^[A-Za-z]$/.test(key)) {
      if (currentGuess.length < 5) {
        setCurrentGuess((prev) => prev + key)
      }
    }
  }

  return { turn, currentGuess, guesses, isCorrect, handleKeyup }
}

export default useWordle
