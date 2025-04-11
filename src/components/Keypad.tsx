import { letters } from '../data/letters'

function Keypad() {
  return (
    <div className="keypad">
      {letters.map((letter) => (
        <div key={letter.key}>{letter.key}</div>
      ))}
    </div>
  )
}

export default Keypad
