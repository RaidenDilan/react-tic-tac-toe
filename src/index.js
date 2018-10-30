import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Here, Square is a React component class, or React component type
// The Square component above only renders built-in DOM components like <button /> etc. />
class Square extends React.Component {
  // React components can have state by setting this.state in their constructors.
  constructor(props) {
    // In JavaScript classes, you need to always call super when defining the constructor of a subclass. All React component classes that have a constructor should start it with a super(props) call.
    super(props);
    // Storing the current value of the Square in this.state
    this.state = {
      value: null,
    };
  }

  // The Square component renders a single <button>
  // The render method returns a description of what you want to see on the screen
  render() {
    return (
      // Passing a prop (porperty) from the parent Board component to the child Square component.
      // When you call setState in a component, React automatically updates the child components inside of it too.
      <button
        className="square"
        onClick={() => this.setState({ value: 'X' }) }
        >
        { this.state.value }
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  // The Board component renders 9 squares
  render() {
    const status = 'Next player: X';

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
