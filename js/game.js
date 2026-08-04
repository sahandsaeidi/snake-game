var Game = {
    gameLoop: null,
    gameSpeed: CONFIG.INITIAL_SPEED,
    isGameOver: false,

    init() {
        Snake.init();
        ScoreManager.init();
        Food.generate();
        this.gameSpeed = CONFIG.INITIAL_SPEED;
        this.isGameOver = false;
        
        Sound.init();
        
        this.startLoop();
        Renderer.render(
            Snake.getBody(),
            Snake.direction,
            Food.getPosition(),
            false,
            ScoreManager.getCurrent()
        );
        
        SFX.restart();
    },

    startLoop() {
        if (this.gameLoop) clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), this.gameSpeed);
    },

    update() {
        if (this.isGameOver) return;

        Snake.updateDirection();
        const head = Snake.move();

        if (Snake.checkWallCollision(head)) {
            SFX.gameOver();
            this.endGame();
            return;
        }

        if (Renderer.checkWallCollision(head)) {
            SFX.gameOver();
            this.endGame();
            return;
        }

        if (Snake.checkSelfCollision(head)) {
            SFX.gameOver();
            this.endGame();
            return;
        }

        Snake.grow(head);
        if (Food.isEaten(head)) {
            SFX.eat();
            
            ScoreManager.add();
            Food.generate();
            
            if (ScoreManager.getCurrent() % CONFIG.SCORE_FOR_SPEED === 0 && 
                this.gameSpeed > CONFIG.MIN_SPEED) {
                this.gameSpeed -= CONFIG.SPEED_STEP;
                this.startLoop();
                SFX.special();
            }
        } else {
            Snake.shrink();
            if (Math.random() < 0.3) {
                SFX.move();
            }
        }

        Renderer.render(
            Snake.getBody(),
            Snake.direction,
            Food.getPosition(),
            false,
            ScoreManager.getCurrent()
        );
    },

    endGame() {
        this.isGameOver = true;
        clearInterval(this.gameLoop);
        Renderer.render(
            Snake.getBody(),
            Snake.direction,
            Food.getPosition(),
            true,
            ScoreManager.getCurrent()
        );
    },

    restart() {
        clearInterval(this.gameLoop);
        this.init();
    }
};