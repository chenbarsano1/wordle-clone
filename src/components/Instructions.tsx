import { useState } from 'react'

type InstructionsProps = {
  isOpen: boolean
  toggleModal: () => void
}

function InstructionsModal({ isOpen, toggleModal }: InstructionsProps) {
  if (!isOpen) return null

  return (
    <div className="modal instructions-modal">
      <div className="modal-content">
        <h1>How to Play</h1>
        <button className="close-button" onClick={toggleModal}>
          ×
        </button>

        <div className="instructions">
          <p>Guess the <b>Wordle</b> in 6 tries.</p>
          <ul>
            <li>Each guess must be a 5-letter word.</li>
            <li>
              The color of the tiles will change to show how close your guess
              was to the word.
            </li>
          </ul>

          <div className="examples">
            <h2>Examples</h2>

            <div className="example">
              <div className="row">
                <div className="green">W</div>
                <div>E</div>
                <div>A</div>
                <div>R</div>
                <div>Y</div>
              </div>
              <p>
                <strong>W</strong> is in the word and in the correct spot.
              </p>
            </div>

            <div className="example">
              <div className="row">
                <div>P</div>
                <div className="yellow">I</div>
                <div>L</div>
                <div>L</div>
                <div>S</div>
              </div>
              <p>
                <strong>I</strong> is in the word but in the wrong spot.
              </p>
            </div>

            <div className="example">
              <div className="row">
                <div>V</div>
                <div>A</div>
                <div>G</div>
                <div className="grey">U</div>
                <div>E</div>
              </div>
              <p>
                <strong>U</strong> is not in the word in any spot.
              </p>
            </div>
          </div>

          <p className="final-note">
            A new word is available each time you refresh!
          </p>
        </div>
      </div>
    </div>
  )
}

function Instructions() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleModal = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <button
        className="instructions-button"
        onClick={toggleModal}
        aria-label="How to play"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </button>
      <InstructionsModal isOpen={isOpen} toggleModal={toggleModal} />
    </>
  )
}

export default Instructions
