import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Connect extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      board: [],
      player1: 1,
      player2: 2,
      currentPlayer: null,
      gameOver: false
    }
  }

  createBoard() {
    let board = [];
    for (let r = 0; r < 6; r++) {
      let row = [];
      for (let c = 0; c < 7; c++) { 
        row.push(null); 
      }
      board.push(row);
    }
  }
}

// ========================================
  
ReactDOM.render(<Connect />, document.getElementById("root"));