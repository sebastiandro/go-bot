import React from "react";
import "./App.css";

const boardWidth = 600;

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.board = {
      rows: [
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        ["o", "x", "o", ".", ".", "o", ".", ".", "."],
        [".", ".", ".", ".", ".", "o", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", ".", "."],
      ],
    };
  }

  createBoard() {
    let numRows = this.board.rows.length;
    let boxWidth = boardWidth / numRows;
    let rows = [];
    this.board.rows.forEach((row, row_ix) => {
      let cols = [];
      row.forEach((col, col_ix) => {
        let colWidth = boxWidth - 1;
        if (col_ix == 0) colWidth = boxWidth - 2;
        cols.push(
          <div
            style={{ width: colWidth, height: boxWidth }}
            className="col"
            key={"col-" + col_ix}
          ></div>
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
      <div id="board" style={{ width: boardWidth, height: boardWidth }}>
        {this.createBoard()}
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
