/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function (n) {
  var solution = [];
  for (var i = 0; i < n; i++) {
    var rowIndexArr = [];
    for (var j = 0; j < n; j++) {
      rowIndexArr[j] = 0;
    }
    solution[i] = rowIndexArr;
  }


  for (var k = 0; k < n; k++) {
    for (var l = 0; l < n; l++) {
      if (k === l) {
        solution[k][l] = 1;
      }
    }
  }
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function (n) {
  var solutionCount = 0;

  function factorial(n) {
    if (n === 0) {
      return null;
    } if (n === 1) {
      return 1;
    }
    if (n > 1) {
      return n * factorial(n - 1);
    }
  };

  solutionCount = factorial(n);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other

// Helper Function 


// var board = new Board({ n: 4 })
// console.log(board.rows())
window.findNQueensSolution = function (n) {
  var solution = new Board({ n: n });
  // Base Cases
  if (n === 0) {
    return solution.rows();
  }
  if (n === 1) {
    solution.togglePiece(0, 0)
    return solution.rows();
  }
  else if (n === 2 || n === 3) {
    return 0;
  }

  // Recursion Cases
  else if (n > 3) {
    // for (var i = 0; i < n; i++) {
    //   var rowIndexArr = [];
    //   for (var j = 0; j < n; j++) {
    //     rowIndexArr[j] = 0;
    //   }
    //   solution[i] = rowIndexArr;
    // }

    for (var i = 0; i < n; i++) {
      for (var j = 0; j < n; j++) {
        solution.togglePiece(i, j);
        if (solution.hasAnyRowConflicts(i) || solution.hasAnyColConflicts(j) || solution.hasAnyMajorDiagonalConflicts(j) || solution.hasAnyMinorDiagonalConflicts(j)) {
          solution.togglePiece(i, j);
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution.rows()));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// window.countNQueensSolutions = function (n) {
//   var solutionCount = undefined; //fixme

//   console.log('Number of solutions for ' + n + ' queens:', solutionCount);
//   return solutionCount;
// };
