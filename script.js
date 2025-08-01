class TicTacToe {
    constructor() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        this.scores = { X: 0, O: 0 };
        
        this.winningConditions = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6] // Diagonals
        ];
        
        this.initializeGame();
    }
    
    initializeGame() {
        this.cells = document.querySelectorAll('[data-cell]');
        this.currentPlayerElement = document.getElementById('current-player');
        this.winningMessageElement = document.getElementById('winning-message');
        this.winningTextElement = document.getElementById('winning-text');
        this.restartButton = document.getElementById('restart-btn');
        this.resetScoreButton = document.getElementById('reset-score-btn');
        this.winningButton = document.getElementById('winning-button');
        
        this.addEventListeners();
        this.updateDisplay();
    }
    
    addEventListeners() {
        this.cells.forEach((cell, index) => {
            cell.addEventListener('click', () => this.handleCellClick(index));
        });
        
        this.restartButton.addEventListener('click', () => this.restartGame());
        this.resetScoreButton.addEventListener('click', () => this.resetScore());
        this.winningButton.addEventListener('click', () => this.restartGame());
    }
    
    handleCellClick(index) {
        if (this.board[index] !== '' || !this.gameActive) {
            return;
        }
        
        this.board[index] = this.currentPlayer;
        this.cells[index].classList.add(this.currentPlayer.toLowerCase());
        
        if (this.checkWin()) {
            this.handleWin();
        } else if (this.checkDraw()) {
            this.handleDraw();
        } else {
            this.switchPlayer();
        }
        
        this.updateDisplay();
    }
    
    checkWin() {
        return this.winningConditions.some(condition => {
            return condition.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
    }
    
    checkDraw() {
        return this.board.every(cell => cell !== '');
    }
    
    handleWin() {
        this.gameActive = false;
        this.scores[this.currentPlayer]++;
        this.updateScoreDisplay();
        
        // Highlight winning cells
        const winningCondition = this.winningConditions.find(condition => {
            return condition.every(index => {
                return this.board[index] === this.currentPlayer;
            });
        });
        
        winningCondition.forEach(index => {
            this.cells[index].classList.add('winning');
        });
        
        this.showWinningMessage(`${this.currentPlayer} Wins!`);
    }
    
    handleDraw() {
        this.gameActive = false;
        this.showWinningMessage("It's a Draw!");
    }
    
    switchPlayer() {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
    
    updateDisplay() {
        this.currentPlayerElement.textContent = this.currentPlayer;
    }
    
    updateScoreDisplay() {
        document.getElementById('score-x').textContent = this.scores.X;
        document.getElementById('score-o').textContent = this.scores.O;
    }
    
    showWinningMessage(message) {
        this.winningTextElement.textContent = message;
        this.winningMessageElement.classList.add('show');
    }
    
    hideWinningMessage() {
        this.winningMessageElement.classList.remove('show');
    }
    
    restartGame() {
        this.board = ['', '', '', '', '', '', '', '', ''];
        this.currentPlayer = 'X';
        this.gameActive = true;
        
        this.cells.forEach(cell => {
            cell.classList.remove('x', 'o', 'winning');
        });
        
        this.hideWinningMessage();
        this.updateDisplay();
    }
    
    resetScore() {
        this.scores = { X: 0, O: 0 };
        this.updateScoreDisplay();
        this.restartGame();
    }
}

// Initialize the game when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TicTacToe();
}); 