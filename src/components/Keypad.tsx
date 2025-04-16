import { KeyColor } from '../types'

type KeypadProps = {
  usedKeys: Record<string, KeyColor>
  onKeyClick: (key: string) => void
}

function Keypad({ usedKeys, onKeyClick }: KeypadProps) {
  // First row: q through p
  const topRow = ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'];
  
  // Second row: a through l
  const middleRow = ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'];
  
  // Third row: Enter, z through m, Backspace
  const bottomRow = ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'];

  const renderKey = (key: string) => {
    const color = usedKeys[key];
    return (
      <div
        key={key}
        data-key={key}
        className={`key ${color} ${['Enter', 'Backspace'].includes(key) ? 'special' : ''}`}
        onClick={() => onKeyClick(key)}
      >
        {key === 'Backspace' ? '⌫' : key}
      </div>
    );
  };

  return (
    <div className="keypad">
      <div className="keypad-row">
        {topRow.map(renderKey)}
      </div>
      <div className="keypad-row">
        <div className="spacer half"></div>
        {middleRow.map(renderKey)}
        <div className="spacer half"></div>
      </div>
      <div className="keypad-row">
        {bottomRow.map(renderKey)}
      </div>
    </div>
  );
}

export default Keypad