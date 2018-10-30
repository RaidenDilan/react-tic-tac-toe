import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Replaced Sqaure Component to a function components
function Square(props) {
  return (
    <button className="square" onClick={ props.onClick }>
      { props.value }
    </button>
  );

  // When we modified the Square to be a function component,
  // we also changed onClick={() => this.props.onClick()} to a shorter onClick={props.onClick}
  // (note the lack of parentheses on both sides).
  // In a class, we used an arrow function to access the correct this value,
  // but in a function component we don’t need to worry about this.
}

class Board extends React.Component {
  // React components can have state by setting this.state in their constructors.
  constructor(props) {
    // / In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start it with a super(props) call.
    super(props);
    // Storing the current value of the Square in this.state
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true, // Each time a player moves, xIsNext (a boolean) will be flipped to determine which player goes next and the game’s state will be saved.
      // When we fill the board in later, the board will look something like this:
      // [
      //   'O', null, 'X',
      //   'X', 'X', 'O',
      //   'O', null, null,
      // ]
    }
  };

  handleClick(i) {
    const squares = this.state.squares.slice(); // In handleClick, we call .slice() to create a copy of the squares array to modify instead of modifying the existing array.

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : '0';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  renderSquare(i) {
    // Each Square will now receive a value prop that will either be 'X', 'O', or null for empty squares.
    // return <Square value={ this.state.squares[i] } />;

    // This function will get called when a Square is clicked. We’ll change the renderSquare method in Board to:
    return (
      <Square
        value={ this.state.squares[i] }
        onClick={ () => this.handleClick(i) }
      />
    // We split the returned element into multiple lines for readability, and added parentheses so that JavaScript doesn’t insert a semicolon after return and break our code
    )
  }

  // The Board component renders 9 squares
  render() {
    // The “status” text in Board’s render will display which player has the next turn:
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : '0');

    const winner = calculateWinner(this.state.squares);
    let status;

    if (winner) status = 'Winner: ' + winner;
    else status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// The Game component renders a board with placeholder values which we’ll modify later.
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

function calculateWinner(squares) {
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
      return squares[a];
    }
  }
  return null;
}
