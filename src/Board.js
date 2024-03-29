// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function () {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function () {
      return _(_.range(this.get('n'))).map(function (rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function (rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function (rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function () {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function (rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function () {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function (rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
             _             _     _
         ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
    
     */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function (rowIndex) {
      // create a var arr that gets elements of rowindex
      // create a var count to increment when you find a element
      // iterate over the elements in the array
      // increment the count by 1
      // if the index  === 1
      // else return counter > 1
      var rowArr = this.get(rowIndex);
      var count = 0;
      for (var i = 0; i < rowArr.length; i++) {
        if (rowArr[i] === 1) {
          count++;
        }
      }
      return count > 1; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function () {
      // create a var boardrows  = this.row()
      // itereate over the elements in row
      // if an elements index value hasRowConflictAt
      // return true
      // else false
      var board = this.rows();
      for (var j = 0; j < board.length; j++) {
        if (this.hasRowConflictAt(j)) {
          return true;
        }
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function (colIndex) {
      var columns = this.rows();
      var counter = 0;
      for (var i = 0; i < columns.length; i++) {
        if (columns[i][colIndex] === 1) {
          counter++
        }
      }
      return counter > 1;// fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function () {
      var columns = this.rows();
      for (var j = 0; j < columns.length; j++) {
        if (this.hasColConflictAt(j)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function (majorDiagonalColumnIndexAtFirstRow) {
      // get row
      // iterate over each cell in every row
      //  _getFirstRowColumnIndexForMajorDiagonalOn for the current cell
      // if  _getFirstRowColumnIndexForMajorDiagonalOn === majorDiagonalColumnIndexAtFirstRow
      // check if the value is 1
      let arrRows = this.rows();
      let count = 0;

      for (let i = 0; i < arrRows.length; i++) {
        for (let j = 0; j < arrRows[i].length; j++) {

          if (this._getFirstRowColumnIndexForMajorDiagonalOn(i, j) === majorDiagonalColumnIndexAtFirstRow &&
            arrRows[i][j] === 1) {
            count++;
          }
        }
      }

      return count > 1;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function () {
      //get rows
      // for each row cell, get _getFirstRowColumnIndexForMajorDiagonalOn
      // call hasMajorDiagonalConflictAt with index
      let arrRows = this.rows();

      for (let i = 0; i < arrRows.length; i++) {
        for (let j = 0; j < arrRows[i].length; j++) {
          if (this.hasMajorDiagonalConflictAt(i - j)) {
            return true;
          }
        }
      }
      return false;
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function (minorDiagonalColumnIndexAtFirstRow) {
      let arrRows = this.rows();
      let count = 0;

      for (let i = 0; i < arrRows.length; i++) {
        for (let j = 0; j < arrRows[i].length; j++) {

          if (this._getFirstRowColumnIndexForMinorDiagonalOn(i, j) === minorDiagonalColumnIndexAtFirstRow &&
            arrRows[i][j] === 1) {
            count++;
          }
        }
      }

      return count > 1;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function () {
      let arrRows = this.rows();

      for (let i = 0; i < arrRows.length; i++) {
        for (let j = 0; j < arrRows[i].length; j++) {
          if (this.hasMinorDiagonalConflictAt(i + j)) {
            return true;
          }
        }
      }
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function (n) {
    return _(_.range(n)).map(function () {
      return _(_.range(n)).map(function () {
        return 0;
      });
    });
  };

}());
