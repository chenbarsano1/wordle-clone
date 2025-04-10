import Row from './Row'
import { LetterObject } from '../types'

type GridProps = {
  guesses: LetterObject[][]
  currentGuess: string
  turn: number
}

function Grid({ guesses, currentGuess, turn }: GridProps) {
  return (
    <div>
      {guesses.map((g, i) => {
        if (turn === i) {
          return <Row key={i} currentGuess={currentGuess} guess={g}/>
        }
        return <Row key={i} guess={g} />
      })}
    </div>
  )
}

export default Grid
