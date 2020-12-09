import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Circle(props) {
  let className = "" 
  if (props.value === "R") {
    className = "circle-red"
  } else if (props.value === "Y") {
    className = "circle-yellow"
  } else {
    className = "circle"
  }
  return (
    <button className={className} onClick={props.onClick}></button>
  );
}

function DropPiece(column, board) {
  for (let row = 5; row >= 0; row--) {
    if (board[row][column] == null) {
      return row;
    }
  }
  return null;
}

function CreateArray(rows) {
  var array = [null];

  for (var i=0; i < rows; i++) {
    array[i] = [null];
  }

  return array;
}

function CheckVertical(board, row, column) {
  let counter = 1
  if (row <= 2) {
    while (row < 5) {
      if (board[row][column] === board[row+1][column]) {
        row++;
        counter++;
        if (counter === 4) {
          return true;
        }
      } else {
        return false;
      }
    }
  } else {
    return false;
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      circles: CreateArray(6),
      redIsNext: true,
      gameOver: false
    };
  }

  handleClick(column) {
    const circles = this.state.circles.slice();
    if (!this.state.gameOver) {
      let row = DropPiece(column, circles)
      if (row != null) {
        circles[row][column] = this.state.redIsNext ? 'R' : 'Y';
        this.setState({
          circles: circles,
          redIsNext: !this.state.redIsNext,
        });
      }
      if (CheckVertical(circles, row, column)){
        this.setState({
          gameOver: true,
        })
      }
    }
  }

  renderCircle(row, column) {
    return (
      <Circle
        value={this.state.circles[row][column]}
        onClick={() => this.handleClick(column)}
      />
    );
  }

    render() {
      let status = ""
      if (this.state.gameOver) {
        status = "Game Over! Winner: " + (this.state.redIsNext ? 'Y' : 'R')
      } else {
        status = 'Next player: ' + (this.state.redIsNext ? 'R' : 'Y');
      }
      let circles = [];
      for (let row = 0; row < 6; row++){
        let rows = [];
        for (let column = 0;  column < 7; column++) {
          rows.push(this.renderCircle(row, column));
        }
        circles.push(<div className="board-row">{rows}</div>);
      }
      return (
        <div>
          <div className="status">{status}</div>
          {circles}
        </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);