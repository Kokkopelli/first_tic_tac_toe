import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type Player = 'red' | 'orange';
type GameBoard = (Player | null)[];
type GameStatus = 'playing' | 'win' | 'draw';

const WINNING_CONDITIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6] // Diagonals
];

export default function Home() {
  const [gameBoard, setGameBoard] = useState<GameBoard>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('red');
  const [gameStatus, setGameStatus] = useState<GameStatus>('playing');
  const [winner, setWinner] = useState<Player | null>(null);
  const [showModal, setShowModal] = useState(false);

  const checkWinner = (board: GameBoard): Player | null => {
    for (const condition of WINNING_CONDITIONS) {
      const [a, b, c] = condition;
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a] as Player;
      }
    }
    return null;
  };

  const checkDraw = (board: GameBoard): boolean => {
    return board.every(cell => cell !== null);
  };

  const handleCellClick = (index: number) => {
    if (gameStatus !== 'playing' || gameBoard[index] !== null) {
      return;
    }

    const newBoard = [...gameBoard];
    newBoard[index] = currentPlayer;
    setGameBoard(newBoard);

    const gameWinner = checkWinner(newBoard);
    if (gameWinner) {
      setGameStatus('win');
      setWinner(gameWinner);
      setTimeout(() => setShowModal(true), 500);
      return;
    }

    if (checkDraw(newBoard)) {
      setGameStatus('draw');
      setTimeout(() => setShowModal(true), 500);
      return;
    }

    setCurrentPlayer(currentPlayer === 'red' ? 'orange' : 'red');
  };

  const resetGame = () => {
    setGameBoard(Array(9).fill(null));
    setCurrentPlayer('red');
    setGameStatus('playing');
    setWinner(null);
    setShowModal(false);
  };

  const getStatusText = () => {
    if (gameStatus === 'win') {
      return `${winner === 'red' ? 'Rød' : 'Orange'} spiller vant!`;
    }
    if (gameStatus === 'draw') {
      return 'Det ble uavgjort!';
    }
    return `${currentPlayer === 'red' ? 'Rød' : 'Orange'} spiller sin tur`;
  };

  const renderMarker = (player: Player) => (
    <div 
      className={`w-8 h-8 rounded-full shadow-lg ${
        player === 'red' ? 'game-red' : 'game-orange'
      }`}
    />
  );

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-game-gray mb-2">Tripp Trapp Tresko</h1>
          <p className="text-gray-600">Tre på rad spill</p>
        </div>

        {/* Game Status */}
        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-game-gray">
            <span 
              className={`inline-block w-6 h-6 rounded-full mr-2 ${
                currentPlayer === 'red' ? 'game-red' : 'game-orange'
              }`}
            />
            <span>{getStatusText()}</span>
          </div>
        </div>

        {/* Game Board */}
        <div className="grid grid-cols-3 gap-2 mb-8 bg-gray-200 p-2 rounded-xl">
          {gameBoard.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleCellClick(index)}
              className="aspect-square bg-white rounded-lg border-2 border-transparent hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 flex items-center justify-center text-4xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:cursor-not-allowed"
              disabled={gameStatus !== 'playing' || cell !== null}
            >
              {cell && renderMarker(cell)}
            </button>
          ))}
        </div>

        {/* Game Controls */}
        <div className="text-center space-y-4">
          <Button
            onClick={resetGame}
            className="bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors duration-200"
          >
            Start nytt spill
          </Button>

          {/* Player Legend */}
          <div className="flex justify-center space-x-6 text-sm">
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full game-red mr-2" />
              <span className="text-gray-600">Spiller 1</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full game-orange mr-2" />
              <span className="text-gray-600">Spiller 2</span>
            </div>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="max-w-sm mx-auto text-center">
          <DialogHeader>
            <div className="flex flex-col items-center space-y-4">
              <div 
                className={`w-16 h-16 rounded-full ${
                  gameStatus === 'win' 
                    ? winner === 'red' ? 'game-red' : 'game-orange'
                    : 'bg-gray-400'
                }`}
              />
              <DialogTitle className="text-2xl font-bold text-game-gray">
                {gameStatus === 'draw' ? 'Uavgjort!' : 'Gratulerer!'}
              </DialogTitle>
            </div>
          </DialogHeader>
          <p className="text-gray-600 mb-6">
            {gameStatus === 'draw' 
              ? 'Det ble uavgjort!' 
              : `${winner === 'red' ? 'Rød' : 'Orange'} spiller vant!`
            }
          </p>
          <Button
            onClick={resetGame}
            className="bg-green-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors duration-200"
          >
            Spill igjen
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
}
