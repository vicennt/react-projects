import React from 'react';
import Square from './Square';

export default class Board extends React.Component {

  renderSquare(i) {
    console.log("[LOG]: " + this.props.winLine )
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
        highlight={this.props.winLine && this.props.winLine.includes(i)}
      />
    );
  }

  render() {
    let tableSize = 3;
    let cont = 0;
    let row = [];
    let board = [];
    for(let i = 0; i < tableSize; i++){
      for (let j = 0; j < tableSize; j++){
          row.push(this.renderSquare(cont))
          cont++;
      }     
      board.push(<div className="board-row">{row}</div>);
      row = [];
    }
    return (
      <div> {board} </div>
    );
  }
}