export function CheckVertical(board, row, column) {
    let counter = 1;
    if (row <= 2) {
        while (row < 5) {
            if (board[row][column] === board[row + 1][column]) {
                row++;
                counter++;
                if (counter === 4) {
                    return true;
                }
            } else {
                return false;
            }
        }
    } else {
        return false;
    }
}


export function CheckHorizontal(board, row, column) {
    let counter = 1;
    while (column >= 0) {
        if (board[row][column] === board[row][column - 1] && board[row][column - 1] != null) {
            column--;
        } else {
            break;
        }
    }
    while (column < 6) {
        if (board[row][column] === board[row][column + 1] && board[row][column + 1] != null) {
            column++;
            counter++;
            if (counter === 4) {
                return true;
            }
        } else {
            return false;
        }
    }
    return false;
}

export function CheckDiagonalLeft(board, row, column) {
    let counter = 1;
    while (column > 0 && row > 0) {
        if (board[row][column] === board[row - 1][column - 1] && board[row - 1][column - 1] != null) {
            column--;
            row--;
        } else {
            break;
        }
    }
    while (column < 6 && row < 5) {
        if (board[row][column] === board[row + 1][column + 1] && board[row + 1][column + 1] != null) {
            column++;
            row++;
            counter++;
            if (counter === 4) {
                return true;
            }
        } else {
            return false;
        }
    }
    return false;
}

export function CheckDiagonalRight(board, row, column) {
    let counter = 1;
    while (column > 0 && row < 5) {
        if (board[row][column] === board[row + 1][column - 1] && board[row + 1][column - 1] != null) {
            column--;
            row++;
        } else {
            break;
        }
    }
    while (column < 6 && row > 0) {
        if (board[row][column] === board[row - 1][column + 1] && board[row - 1][column + 1] != null) {
            column++;
            row--;
            counter++;
            if (counter === 4) {
                return true;
            }
        } else {
            return false;
        }
    }
    return false;
}

export function CheckDiagonal(board, row, column) {
    return (CheckDiagonalRight(board, row, column) || CheckDiagonalLeft(board, row, column));
}

export function CheckDraw(board) {
    for (let column = 0; column < 6; column++) {
        if (board[0][column] == null) {
            return false;
        }
    }
    return true;
}