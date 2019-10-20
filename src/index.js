module.exports = function solveSudoku(matrix) {
  const saveEmptyPositions = matrix => {
    let output = [];
    matrix.forEach((row, rowIndex) => {
      row.forEach((num, colIndex) => {
        if (num === 0) {
          output.push([rowIndex, colIndex]);
        }
      });
    });
    return output;
  };

  const checkRow = (row, value) => {
    return !row.some(el => el === value);
  };

  const checkColumn = (matrix, column, value) => {
    return !matrix.map(el => el[column]).some(num => num === value);
  };

  const check3x3Square = (matrix, column, row, value) => {
    var columnCorner = 0,
      rowCorner = 0,
      squareSize = 3;

    while (column >= columnCorner + squareSize) {
      columnCorner += squareSize;
    }

    while (row >= rowCorner + squareSize) {
      rowCorner += squareSize;
    }

    for (var i = rowCorner; i < rowCorner + squareSize; i++) {
      for (var j = columnCorner; j < columnCorner + squareSize; j++) {
        if (matrix[i][j] === value) {
          return false;
        }
      }
    }

    return true;
  };

  const checkValue = (matrix, column, row, value) => {
    return (
      checkRow(matrix[row], value) &&
      checkColumn(matrix, column, value) &&
      check3x3Square(matrix, column, row, value)
    );
  };

  const solvePuzzle = matrix => {
    const emptyPositions = saveEmptyPositions(matrix);
    let row, column, value, found;
    for (i = 0; i < emptyPositions.length; ) {
      row = emptyPositions[i][0];
      column = emptyPositions[i][1];
      value = matrix[row][column] + 1;
      found = false;
      while (!found && value <= 9) {
        if (checkValue(matrix, column, row, value)) {
          found = true;
          matrix[row][column] = value;
          i++;
        } else {
          value++;
        }
      }
      if (!found) {
        matrix[row][column] = 0;
        i--;
      }
    }

    return matrix;
  };

  return solvePuzzle(matrix);
};
