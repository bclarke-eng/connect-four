import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as winner from './checkWinner.js';

function Circle(props) {
  let className = "" 
  if (props.value === "Red") {
    className = "circle-red"
  } else if (props.value === "Yellow") {
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

class Board extends React.Component {

  renderCircle(row, column) {
    return (
      <Circle
        value={this.props.circles[row][column]}
        onClick={() => this.props.onClick(column)}
      />
    );
  }

    render() {
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
          {circles}
        </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
      circles: CreateArray(6),
      redIsNext: true,
      gameOver: false,
      draw: false,
    };
  }

  resetGame() {
    this.setState({
      circles: CreateArray(6),
      redIsNext: true,
      gameOver: false,
      draw: false,
    })
  }

  handleClick(column) {
    const circles = this.state.circles.slice();
    if (!this.state.gameOver) {
      let row = DropPiece(column, circles)
      if (row != null) {
        circles[row][column] = this.state.redIsNext ? 'Red' : 'Yellow';
        this.setState({
          circles: circles,
          redIsNext: !this.state.redIsNext,
        });
      }
      if (winner.CheckVertical(circles, row, column) ||
          winner.CheckHorizontal(circles, row, column) ||
          winner.CheckDiagonal(circles, row, column)) {
        this.setState({
          gameOver: true,
        })
      } else if (winner.CheckDraw(circles)) {
        this.setState({
          draw: true,
        })
      }
    }
  }

  render() {
  const circles = this.state.circles;

  let status = ""
      if (this.state.gameOver) {
        status = "Game Over! Winner: " + (this.state.redIsNext ? 'Yellow' : 'Red')
      } else if (this.state.draw) {
        status = "Game Over! It's a Draw!";
      } else {
        status = 'Next player: ' + (this.state.redIsNext ? 'Red' : 'Yellow');
      }

    return (
    <div>
    <div><h1>{status}</h1></div>
      <div className="game">
          <div className="game-board">
            <Board circles={circles} onClick={(column) => this.handleClick(column)}/>
          </div>
      </div>
      <div className="game-button"><button onClick={() => this.resetGame()}>Restart Game</button></div>
     </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);