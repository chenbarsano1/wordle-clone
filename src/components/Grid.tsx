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
        return <Row key={i} />
      })}
    </div>
  )
}

export default Grid
