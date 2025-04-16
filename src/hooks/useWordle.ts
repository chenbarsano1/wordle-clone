import { useState } from 'react'
import { KeyColor, LetterObject } from '../types'
import { toast } from 'react-toastify'

const useWordle = (solution: String) => {
  const [turn, setTurn] = useState<number>(0)
  const [currentGuess, setCurrentGuess] = useState<string>('')
  const [guesses, setGuesses] = useState<LetterObject[][]>(
    Array.from({ length: 6 }, () => [])
  )
  const [history, setHistory] = useState<string[]>([])
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  const [usedKeys, setUsedKeys] = useState<Record<string, KeyColor>>({})

  // format a guess into an array of letter objects
  // e.g. [{key: 'a', color: 'yellow'}]
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

  // add a new guess to the guesses state
  // update the isCorrect state if the guess is correct
  // add one to the turn state
  const addNewGuess = (formattedGuess: LetterObject[]) => {
    if (currentGuess === solution) {
      setIsCorrect(true)
    }

    setGuesses((prevGuesses) => {
      const newGuesses = [...prevGuesses]
      newGuesses[turn] = formattedGuess
      return newGuesses
    })

    setHistory((prevHistory) => [...prevHistory, currentGuess])
    setTurn((prevTurn) => prevTurn + 1)

    setTimeout(() => {
      setUsedKeys((prevUsedKeys) => {
        const newUsedKeys = { ...prevUsedKeys }

        formattedGuess.forEach((l) => {
          const currentColor = newUsedKeys[l.key]

          if (l.color === 'green') {
            newUsedKeys[l.key] = 'green'
            return
          }

          if (l.color === 'yellow' && currentColor !== 'green') {
            newUsedKeys[l.key] = 'yellow'
            return
          }

          if (
            l.color === 'grey' &&
            currentColor !== 'green' &&
            currentColor !== 'yellow'
          ) {
            newUsedKeys[l.key] = 'grey'
            return
          }
        })
        return newUsedKeys
      })
    }, 1800)

    setCurrentGuess('')
  }

  // handle keyup event and track current guess
  // if user presses enter, add the new guess to the guesses array
  // if user presses backspace, remove the last letter from the current guess
  const handleKeyup = ({ key }: KeyboardEvent) => {
    if (key === 'Enter') {
      // only add guess if the game is not over
      if (turn > 5) {
        toast.error('You have used all your guesses')
        return
      }
      // do not allow duplicate guesses
      if (history.includes(currentGuess)) {
        toast.warning('You have already guessed that word')
        return
      }
      // check word is 5 letters long
      if (currentGuess.length !== 5) {
        toast.info('Word must be 5 letters long')
        return
      }
      const formatted = formatGuess()
      addNewGuess(formatted)
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

  return { turn, currentGuess, guesses, isCorrect, handleKeyup, usedKeys }
}

export default useWordle
