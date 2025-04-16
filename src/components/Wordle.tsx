import { useEffect, useState } from 'react'
import useWordle from '../hooks/useWordle'
import Grid from './Grid'
import Keypad from './Keypad'
import Modal from './Modal'

type WordleProps = {
  solution: string
}

export default function Wordle({ solution }: WordleProps) {
  const { currentGuess, handleKeyup, guesses, turn, isCorrect, usedKeys } =
    useWordle(solution)
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    window.addEventListener('keyup', handleKeyup)

    if (isCorrect) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    if (turn > 5) {
      setTimeout(() => setShowModal(true), 2000)
      window.removeEventListener('keyup', handleKeyup)
    }

    return () => {
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [handleKeyup, isCorrect, turn])

  // Function to handle key clicks from the Keypad component
  const handleClick = (key: string) => {
    const fakeKeyupEven = { key } as KeyboardEvent
    handleKeyup(fakeKeyupEven)
  }

  return (
    <div>
      {/* <div>Solution - {solution}</div>
      <div>Current Guess - {currentGuess}</div> */}
      <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
      <Keypad usedKeys={usedKeys} onKeyClick={handleClick}/>
      {showModal && (
        <Modal isCorrect={isCorrect} turn={turn} solution={solution} />
      )}
    </div>
  )
}
