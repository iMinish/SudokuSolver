// INPUT SUDOKU BOARD 1
let sudokuBoard = [[0,0,8,4,9,3,5,0,6],
                   [0,0,3,1,0,2,0,0,4],
                   [0,4,5,7,0,0,0,9,0],
                   [6,9,0,0,0,5,0,0,7],
                   [0,8,0,0,0,0,0,5,0],
                   [4,0,0,3,0,0,0,1,8],
                   [0,7,0,0,0,6,2,4,0],
                   [1,0,0,5,0,7,8,0,0],
                   [8,0,6,9,0,1,3,0,0]]; // VALID SUDOKU BOARD

// INPUT SUDOKU BOARD 2
// let sudokuBoard = [[6,5,0,8,7,3,0,9,0],
//                    [0,0,3,2,5,0,0,0,8],
//                    [9,8,0,1,0,4,3,5,7],
//                    [1,0,5,0,0,0,0,0,0],
//                    [4,0,0,0,0,0,0,0,2],
//                    [0,0,0,0,0,0,5,0,3],
//                    [5,7,8,3,0,1,0,2,6],
//                    [2,0,0,0,4,8,9,0,0],
//                    [0,9,0,6,2,5,0,8,1]]; // VALID SUDOKU BOARD

// INPUT SUDOKU BOARD 3
// let sudokuBoard = [[0,2,0,0,1,6,7,0,0],
//                    [0,0,5,8,0,0,0,4,6],
//                    [0,1,8,7,0,0,2,0,0],
//                    [0,0,0,0,5,4,9,0,8],
//                    [8,0,9,3,0,0,0,0,0],
//                    [0,7,2,0,9,0,0,3,0],
//                    [0,3,7,0,0,5,0,0,2],
//                    [0,0,0,6,7,0,0,1,5],
//                    [2,5,0,0,0,0,8,0,0]]; // VALID SUDOKU BOARD

// INPUT SUDOKU BOARD 4
// let sudokuBoard = [[1,2,0,0,1,6,7,0,0],
//                    [0,0,5,8,0,0,0,4,6],
//                    [0,1,8,7,0,0,2,0,0],
//                    [0,0,0,0,5,4,9,0,8],
//                    [8,0,9,3,0,0,0,0,0],
//                    [0,7,2,0,9,0,0,3,0],
//                    [0,3,7,0,0,5,0,0,2],
//                    [0,0,0,6,7,0,0,1,5],
//                    [2,5,0,0,0,0,8,0,0]]; // INVALID SUDOKU BOARD

// CONVERT 2D ARRAY INTO HTML TABLE
function makeTableHTML(array) {
    let table = "<table align=center border=1>";
    for(let i = 0; i < array.length; i++) {
        table += "<tr>";
        for(let j = 0; j < array[i].length; j++) {
          if(sudokuBoard[i][j] == 0) {
            sudokuBoard[i][j] = ''; // IF LOCATION IS BLANK (0), CHANGE IT TO BE AN EMPTY SPACE ('')
          }
          table += "<td>" + array[i][j] + "</td>";
        }
        table += "</tr>";
    }
    table += "</table>";
    return table;
}

// SEARCH SUDOKU BOARD FOR BLANK LOCATIONS
function searchSudoku(row, col) {
  let blankLocation = false; // LOCATION IS NOT BLANK
  for(let i = 0; i < sudokuBoard.length; i++) {
    for(let j = 0; j < sudokuBoard.length; j++) {
      if(sudokuBoard[i][j] == 0) {
        blankLocation = true; // LOCATION IS BLANK
        row = i;
        col = j;
        let result = [blankLocation, row, col];
        return result; // BLANK LOCATION FOUND
      }
    }
  }
  let result = [blankLocation, -1, -1];
  return result; // NO BLANK LOCATION FOUND
}

// CHECK IF SUDOKU BOARD IS VALID
function checkSudoku(num, row, col) {
  // CHECK ROWS
  for(let i = 0; i < sudokuBoard.length; i++) {
    if(sudokuBoard[row][i] == num) {
      return false; // DUPLICATE CELL FOUND
    }
  }
  // CHECK COLUMNS
  for(let i = 0; i < sudokuBoard.length; i++) {
    if(sudokuBoard[i][col] == num) {
      return false; // DUPLICATE CELL FOUND
    }
  }
  // CHECK BLOCKS
  let rowStart = Math.floor(row / 3) * 3;
  let colStart = Math.floor(col / 3) * 3;
  for(let i = rowStart; i < rowStart + 3; i++) {
    for(let j = colStart; j < colStart + 3; j++) {
      if(sudokuBoard[i][j] == num) {
        return false; // DUPLICATE CELL FOUND
      }
    }
  }
  return true; // SUDOKU BOARD IS VALID
}

// RECURSIVE SUDOKU SOLVER WITH BACKTRACKING
function solveSudoku() {
  let row = 0;
  let col = 0;
  let location = searchSudoku(row, col); // LOCATION TO FILL
  if(location[0] == 0) {
    return true; // NO BLANK LOCATIONS LEFT
  }
  row = location[1];
  col = location[2];
  for(let i = 1; i <= sudokuBoard.length; i++) {
    if(checkSudoku(i, row, col)) {
      sudokuBoard[row][col] = i;
      if(solveSudoku()) {
        return true; // SUDOKU HAS BEEN SOLVED
      }
      console.log("Backtracking on", sudokuBoard[row][col], "at ROW", row, ", COL", col);
      sudokuBoard[row][col] = 0; // BACKTRACKING STEP (CELL MARKED AS BLANK)
    }
  }
  return false; // UNABLE TO SOLVE SUDOKU
}

// UNSOLVED OUTPUT: sudokuBoard
document.write("<h1>[sudokuBoard] Unsolved Sudoku Board</h1>");
document.write(makeTableHTML(sudokuBoard));

// SOLVED OUTPUT: sudokuBoard
document.write("<br><h1>[sudokuBoard] Solved Sudoku Board (IF VALID)</h1>");
if(!solveSudoku()) {
  console.log("sudokuBoard: INVALID SUDOKU BOARD --> NOT SOLVED");
} else if(solveSudoku()) {
  console.log("sudokuBoard: VALID SUDOKU BOARD --> SOLVED");
} else {
  console.log("sudokuBoard: FATAL ERROR");
  exit();
}
document.write(makeTableHTML(sudokuBoard));
