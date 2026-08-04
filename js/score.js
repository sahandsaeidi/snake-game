const ScoreManager = {
    current: 0,
    high: parseInt(localStorage.getItem('snakeHighScore')) || 0,

    init() {
        this.current = 0;
        this.updateDisplay();
    },

    add() {
        this.current++;
        if (this.current > this.high) {
            this.high = this.current;
            localStorage.setItem('snakeHighScore', this.high);
        }
        this.updateDisplay();
    },

    updateDisplay() {
        document.getElementById('scoreDisplay').textContent = this.current;
        document.getElementById('highScoreDisplay').textContent = this.high;
    },

    getCurrent() {
        return this.current;
    },

    getHigh() {
        return this.high;
    }
};