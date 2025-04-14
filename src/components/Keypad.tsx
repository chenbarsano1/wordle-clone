import { letters } from '../data/letters'
import { KeyColor } from '../types'

type KeypadProps = {
  usedKeys: Record<string, KeyColor>
}

function Keypad({ usedKeys }: KeypadProps) {
  return (
    <div className="keypad">
      {letters.map((letter) => {
        const color = usedKeys[letter.key]
        return (
          <div key={letter.key} className={color}>
            {letter.key}
          </div>
        )
      })}
    </div>
  )
}

export default Keypad
