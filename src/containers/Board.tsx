import { useEffect, useState } from "react";
import Squares from "../components/Squares";
type Player = "X" | "O" | "both" | null;

function calculateWinner(squares: Player[]) {
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

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [Player, setPlayer] = useState<"X" | "O">(
    Math.round(Math.random() * 1) === 1 ? "X" : "O"
  );
  const [winner, setWinner] = useState<Player>(null);

  function reset() {
    setSquares(Array(9).fill(null));
    setWinner(null);
    setPlayer(Math.round(Math.random() * 1) === 1 ? "X" : "O");
  }

  function setSquareValue(index: number) {
    const newData = squares.map((val, i) => {
      if (i === index) {
        return Player;
      }
      return val;
    });
    setSquares(newData);
    setPlayer(Player === "X" ? "O" : "X");
  }

  useEffect(() => {
    const w = calculateWinner(squares);
    if (w) {
      setWinner(w);
    }

    if (!w && !squares.filter((square) => !square).length) {
      setWinner("both");
    }
  });

  return (
    <div>
      {!winner && <p className="turn">{Player}'s turn</p>}
      {winner && winner !== "both" && <p className="turn"> {winner} Won!</p>}
      {winner && winner === "both" && <p className="turn">It's a draw!</p>}

      <div className="grid">
        {Array(9)
          .fill(null)
          .map((_, i) => {
            return (
              <Squares
                onClick={() => setSquareValue(i)}
                value={squares[i]}
                winner={winner}
                key={i}
              />
            );
          })}
      </div>
      <div className="button-flex">
        <button className="reset" onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
}

export default Board;
