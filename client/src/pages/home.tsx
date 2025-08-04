import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

type Player = 'red' | 'orange';
type GameBoard = (Player | null)[];
type GameStatus = 'playing' | 'win' | 'draw';
type GameMode = 'human' | 'ai';

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
  const [gameMode, setGameMode] = useState<GameMode>('human');
  const [isAiThinking, setIsAiThinking] = useState(false);

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

  // AI move logic using minimax algorithm
  const evaluateBoard = (board: GameBoard, depth: number, isMaximizing: boolean): number => {
    const gameWinner = checkWinner(board);
    
    if (gameWinner === 'orange') return 10 - depth; // AI wins
    if (gameWinner === 'red') return depth - 10; // Human wins
    if (checkDraw(board)) return 0; // Draw
    
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'orange';
          const score = evaluateBoard(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'red';
          const score = evaluateBoard(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (board: GameBoard): number => {
    let bestScore = -Infinity;
    let bestMove = 0;
    
    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'orange';
        const score = evaluateBoard(board, 0, false);
        board[i] = null;
        
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    
    return bestMove;
  };

  const makeAiMove = (board: GameBoard) => {
    setIsAiThinking(true);
    
    setTimeout(() => {
      const aiMove = getBestMove([...board]);
      const newBoard = [...board];
      newBoard[aiMove] = 'orange';
      setGameBoard(newBoard);
      
      const gameWinner = checkWinner(newBoard);
      if (gameWinner) {
        setGameStatus('win');
        setWinner(gameWinner);
        setTimeout(() => setShowModal(true), 500);
        setIsAiThinking(false);
        return;
      }

      if (checkDraw(newBoard)) {
        setGameStatus('draw');
        setTimeout(() => setShowModal(true), 500);
        setIsAiThinking(false);
        return;
      }

      setCurrentPlayer('red');
      setIsAiThinking(false);
    }, 800); // Add delay to make AI move feel more natural
  };

  const handleCellClick = (index: number) => {
    if (gameStatus !== 'playing' || gameBoard[index] !== null || isAiThinking) {
      return;
    }

    // Human player's move
    const newBoard = [...gameBoard];
    newBoard[index] = 'red';
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

    if (gameMode === 'ai') {
      setCurrentPlayer('orange');
      makeAiMove(newBoard);
    } else {
      setCurrentPlayer(currentPlayer === 'red' ? 'orange' : 'red');
    }
  };

  const resetGame = () => {
    setGameBoard(Array(9).fill(null));
    setCurrentPlayer('red');
    setGameStatus('playing');
    setWinner(null);
    setShowModal(false);
    setIsAiThinking(false);
  };

  const getStatusText = () => {
    if (gameStatus === 'win') {
      if (gameMode === 'ai') {
        return winner === 'red' ? 'Du vant!' : 'Maskinen vant!';
      }
      return `${winner === 'red' ? 'Rød' : 'Orange'} spiller vant!`;
    }
    if (gameStatus === 'draw') {
      return 'Det ble uavgjort!';
    }
    
    if (gameMode === 'ai') {
      if (isAiThinking) {
        return 'Maskinen tenker...';
      }
      return currentPlayer === 'red' ? 'Din tur' : 'Maskinens tur';
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

        {/* Game Mode Toggle */}
        <div className="flex items-center justify-center space-x-3 mb-6">
          <Label htmlFor="game-mode" className="text-sm font-medium text-gray-700">
            Spill mot menneske
          </Label>
          <Switch
            id="game-mode"
            checked={gameMode === 'ai'}
            onCheckedChange={(checked) => {
              setGameMode(checked ? 'ai' : 'human');
              resetGame();
            }}
          />
          <Label htmlFor="game-mode" className="text-sm font-medium text-gray-700">
            Spill mot maskin
          </Label>
        </div>

        {/* Game Status */}
        <div className="text-center mb-6">
          <div className="text-lg font-semibold text-game-gray">
            {!isAiThinking && (
              <span 
                className={`inline-block w-6 h-6 rounded-full mr-2 ${
                  currentPlayer === 'red' ? 'game-red' : 'game-orange'
                }`}
              />
            )}
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
              disabled={gameStatus !== 'playing' || cell !== null || isAiThinking}
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
              <span className="text-gray-600">
                {gameMode === 'ai' ? 'Du' : 'Spiller 1'}
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 rounded-full game-orange mr-2" />
              <span className="text-gray-600">
                {gameMode === 'ai' ? 'Maskin' : 'Spiller 2'}
              </span>
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
              : gameMode === 'ai'
                ? (winner === 'red' ? 'Du vant!' : 'Maskinen vant!')
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
