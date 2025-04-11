import { useEffect } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'

type WordleProps = {
  solution: string
}

export default function Wordle({ solution }: WordleProps) {
  const { currentGuess, handleKeyup, guesses, turn, isCorrect } =
    useWordle(solution)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)
    return () => {
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [handleKeyup])

  useEffect(() => {
    console.log(guesses, turn, isCorrect)
  }, [guesses, turn, isCorrect])

  return (
    <div>
      <div>Solution - {solution}</div>
      <div>Current Guess - {currentGuess}</div>
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad />
    </div>
  )
}
