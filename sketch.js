// This project is developed based on the code and concepts from 
// Daniel Shiffman's video on Tic Tac Toe AI with Minimax Algorithm
// that is online here: https://www.youtube.com/watch?v=trKjYdBASyQ



// global variables
let gameBoard = [
  [-1, -1, -1],
  [-1, -1, -1],
  [-1, -1, -1]
];

let module;
let offset = 20;
let strokeWidth = 6;
let player0 = 0; // human player
let player1 = 1; // ai player
let openMoves = 9;
let currentPlayer = 1;
let winner = -1;

function setup() {
  createCanvas(400, 400);
  module = (width - (offset * 2)) / 3;
  ellipseMode(CORNER);
  stroke(255);
  strokeWeight(strokeWidth);
  smooth();
}

function updateBoard() {
  if (winner == -1 && openMoves > 0) {
    background(74, 182, 212);
    // draw current board
    for (let i = 1; i < 3; i++) {
      line(offset, module * i + offset, width - offset, module * i + offset);
      line(module * i + offset, offset, module * i + offset, height - offset);
    }

    // draw board players
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard[j][i] === 1) {
          line(2 * offset + module * i, offset * 2 + module * j, module * (i + 1), module * (j + 1));
          line(module * (i + 1), 2 * offset + module * j, 2 * offset + module * i, module * (j + 1));
        } else if (gameBoard[j][i] === 0) {
          ellipse(2 * offset + module * i, offset * 2 + module * j, module - offset * 2);
        }
      }
    }
  } else {
    background(74, 182, 212);
    // draw current board;
    for (let i = 1; i < 3; i++) {
      line(offset, module * i + offset, width - offset, module * i + offset);
      line(module * i + offset, offset, module * i + offset, height - offset);
    }

    // draw board players
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard[j][i] === 1) {

          line(2 * offset + module * i, offset * 2 + module * j, module * (i + 1), module * (j + 1));
          line(module * (i + 1), 2 * offset + module * j, 2 * offset + module * i, module * (j + 1));
        } else if (gameBoard[j][i] === 0) {
          ellipse(2 * offset + module * i, offset * 2 + module * j, module - offset * 2);
        }
      }
    }


    // draw winners
    background(74, 182, 212, 99);
    // draw board players
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (gameBoard[j][i] === 1) {
          if (gameBoard[j][i] == winner) {
            line(2 * offset + module * i, offset * 2 + module * j, module * (i + 1), module * (j + 1));
            line(module * (i + 1), 2 * offset + module * j, 2 * offset + module * i, module * (j + 1));
          }
        } else if (gameBoard[j][i] === 0) {
          if (gameBoard[j][i] == winner) {
            ellipse(2 * offset + module * i, offset * 2 + module * j, module - offset * 2);
          }
        }
      }
    }
  }
}

function matchCheck(x, y, z) {
  if (x != -1 && x == y && y == z) {
    // console.log(a,b,c);
    return true;
  } else {
    // console.log(a,b,c);
    return false;
  }
}

function checkWinner(board, moves) {

  for (let i = 0; i < 3; i++) {
    // check all horizontal
    if (matchCheck(board[i][0], board[i][1], board[i][2])) {
      return gameBoard[i][0];
    }

    // check all vertical
    if (matchCheck(board[0][i], board[1][i], board[2][i])) {
      // winner
      return board[0][i];
    }

    // check all diagnol 
    if (matchCheck(board[0][0], board[1][1], board[2][2])) {
      // winner
      return gameBoard[0][0];
    }
    if (matchCheck(board[2][0], board[1][1], board[0][2])) {
      // winner
      return board[2][0];
    }
  }

  if (moves > 0) {
    // no current winner so return -1
    return -1;
  } else {
    // no winner and no moves so return -2 for tie
    return -2;
  }
}

function aiMove() {
  // get best possible move 
  let highScore = -Infinity;
  let smartMove;


  if (openMoves > 0) {
    if (currentPlayer == 1) {
      // loop through all possible moves
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (gameBoard[j][i] == -1) {
            gameBoard[j][i] = player1;
            let curScore = minimax(gameBoard, openMoves - 1, 0, false);
            gameBoard[j][i] = -1;
            // test for max score
            if (highScore < curScore) {
              highScore = curScore;
              smartMove = [j,i];
            }
          }
        }
      }
    // make move
    gameBoard[smartMove[0]][smartMove[1]] = currentPlayer;
    currentPlayer = (currentPlayer + 1) % 2;
    openMoves -= 1;
    return true;
    }
  }
}

// board is array of ints representing state of board to score
// moves is the number of moves left on the given board
// level is the recursive depth of the game state
// if maximize is true then return a max score for winning of 1 
// else maximize is false return a min score for winning -1
// when there is a tie return a neutral score of 0 
function minimax(board, moves, level, maximize) {
  
  // check for winner 
  let result = checkWinner(board, moves);
  if (result == -2) {
    // tie. return neutral points. 
    return 0;
  } else if (result == player1 ) {
    // ai wins return max points
    return 10;
  } else if (result == player0) {
    // human wins return min points
    return -10;
  } else {
    // no result. call all submoves. 

    if (maximize) {
    // maximize true means player1 gets next move
    // try for max possible score
    // loop through all moves return max score 
      let highScore = -Infinity;
      
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[j][i] == -1) {
            board[j][i] = player1;
            let curScore = minimax(board, moves - 1, 0 + 1, !maximize);
            board[j][i] = -1;
            highScore = max(highScore, curScore);
          }
        }
      }
      return highScore;
    } else {
    // maximize false means player0 gets next move
    // try for min possible score
    // loop through all moves return min score
      let lowScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[j][i] == -1) {
            board[j][i] = player0;
            let curScore = minimax(board, moves - 1, 0 + 1, !maximize);
            board[j][i] = -1;
            lowScore = min(lowScore, curScore);
          }
        }
      }
      return lowScore;
    }
  }

  // recursive case: call minimax for all possible moves

  // get score for all possible moves

  // evaluate max move score

  // evaluate min move score
}

function mouseClicked() {
  if (openMoves > 0 && currentPlayer == 0 && winner == -1) {
    let minDist = Infinity;
    let cury = floor(mouseY / module);
    let curx = floor(mouseX / module);
    if (gameBoard[cury][curx] == -1) {
      gameBoard[cury][curx] = currentPlayer;
      currentPlayer = (currentPlayer + 1) % 2;
      openMoves -= 1;
    }
  } else {
    // new game
    gameBoard = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1]
    ];
    openMoves = 9;
    currentPlayer = 1;
    winner = -1;
  }
}

function draw() {

  // console.log(checkWinner());

  // check for winner
  winner = checkWinner(gameBoard, openMoves);
  // check for play
  aiMove();

  updateBoard();



}