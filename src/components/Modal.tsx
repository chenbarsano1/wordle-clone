type ModalProps = {
    isCorrect: boolean
    turn: number
    solution: string
  }
  
  function Modal({ isCorrect, turn, solution }: ModalProps) {
    const handleRefresh = () => {
      window.location.reload();
    }
    
    // Function to create solution letter squares
    const renderSolutionLetters = () => {
      return solution.split('').map((letter, index) => (
        <div key={index} className="solution-letter">
          {letter}
        </div>
      ));
    };
  
    return (
      <div className="modal">
        {isCorrect && (
          <div className="modal-content win">
            <h1>Congratulations! 🎉</h1>
            <p>The word was:</p>
            <div className="solution-row">
              {renderSolutionLetters()}
            </div>
            <p>You guessed the word in <strong>{turn} {turn === 1 ? 'try' : 'tries'}</strong>!</p>
            <button onClick={handleRefresh}>Play Again</button>
          </div>
        )}
        {!isCorrect && (
          <div className="modal-content lose">
            <h1>Game Over 😔</h1>
            <p>The word was:</p>
            <div className="solution-row">
              {renderSolutionLetters()}
            </div>
            <p>Better luck next time!</p>
            <button className="lose" onClick={handleRefresh}>Try Again</button>
          </div>
        )}
      </div>
    )
  }
  
  export default Modal