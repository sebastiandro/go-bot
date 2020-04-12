import React from "react";
import "./App.css";

const boardWidth = 400;
const socket = new WebSocket("ws://localhost:8765/sub");

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: {
        rows: [
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
          [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ],
      },
    };

    socket.onopen = function (e) {
      console.log("Connected to game socket.");
    };
  }

  componentDidMount() {
    socket.onmessage = (event) => {
      this.setState({
        board: JSON.parse(event.data),
      });
    };
  }

  getStone(column, width) {
    if (column === "o")
      return (
        <div
          style={{
            height: width,
            width: width,
            right: width / 2,
            top: -width / 2,
          }}
          className="black-stone stone"
        ></div>
      );
    if (column === "x")
      return (
        <div
          style={{
            height: width,
            width: width,
            right: width / 2,
            top: -width / 2,
          }}
          className="white-stone stone"
        ></div>
      );
    return "";
  }

  createBoard() {
    let numRows = this.state.board.rows.length;
    let boxWidth = boardWidth / numRows;
    let rows = [];
    this.state.board.rows.forEach((row, row_ix) => {
      let cols = [];
      row.forEach((col, col_ix) => {
        let colWidth = boxWidth - 1;
        if (col_ix === 0) colWidth = boxWidth - 2;
        cols.push(
          <div
            style={{ width: colWidth, height: boxWidth }}
            className="col"
            key={"col-" + col_ix}
          >
            {this.getStone(col, boxWidth)}
          </div>
        );
      });
      rows.push(
        <div style={{ height: boxWidth }} key={"row-" + row_ix} className="row">
          {cols}
        </div>
      );
    });
    return rows;
  }

  render() {
    return (
      <div id="board" style={{ width: boardWidth }}>
        {this.state.board ? this.createBoard() : ""}
      </div>
    );
  }
}

function App() {
  return (
    <div style={{ width: boardWidth + 60 }} className="App">
      <h1>Go Bots be Playing!</h1>
      <Board />
    </div>
  );
}

export default App;
