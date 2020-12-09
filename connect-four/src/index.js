import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Circle extends React.Component {
  render() {
    return (
      <button className="circle">
        X
      </button>
    );
  }
}

class Board extends React.Component {
  renderCircle(i) {
    return <Circle />;
  }


  render() {
    const status = 'Next player: Red';
	let circles = [];
	for (let row = 0; row < 6; row++){
			let row = [];
			for (let column = 0;  column < 7; column++) {
				row.push(this.renderCircle(column));
			}
			circles.push(<div className="board-row">{row}</div>);
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