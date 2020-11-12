import React from "react";
import Board from "./Board";

function calculateWinner(squares){
  const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return {
          winner: squares[a],
          line: lines[i]
       }
      }
    }
    return { 
      winner: null
    };
}


export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null)
      }],
      stepNumber: 0,
      xIsNext: true,
      moveListOrder: "ASC"
    };
  }

  handleOrderMoveList(){
    this.setState({
      moveListOrder: this.state.moveListOrder === "ASC" ? "DESC" : "ASC"
    });
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares).winner || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        squareClicked : i
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step){
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2 ) === 0
    })
  }

  
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winnerObject = calculateWinner(current.squares);
    
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move + " -> (" + (1 + Math.trunc(step.squareClicked / 3)) + "," + (step.squareClicked % 3) + ")" :
        'Go to game start';
        return(
          <li key={move} >
            <button 
              style={move === this.state.stepNumber ? { fontWeight : "bold"} : { fontWeight : "normal"}} 
              onClick={() => this.jumpTo(move)}>{desc}
            </button>
          </li>
        )
    })

    let status;
    if (winnerObject.winner) {
      status = 'Winner: ' + winnerObject.winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
            winLine={winnerObject.line}
          />
        </div>
        <div className="game-info">
          <p>Current order: {this.state.moveListOrder}</p>
          <span>Change order: </span>
          <input type="checkbox" name="toggleSwitch" id="toggleSwitch" onClick={() => this.handleOrderMoveList()}/>
          <div>{status}</div>
          <ol>{this.state.moveListOrder === "ASC" ? moves : moves.reverse()}</ol>
        </div>
      </div>
    );
  }
}