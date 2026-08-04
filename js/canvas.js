const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const Renderer = {
    drawGrid() {
        const showGrid = typeof Settings !== 'undefined' ? Settings.get('showGrid') : true;
        if (!showGrid) return;
        
        ctx.strokeStyle = CONFIG.COLORS.GRID;
        ctx.lineWidth = 0.5;
        for (let i = 0; i <= CONFIG.GRID_SIZE; i++) {
            ctx.beginPath();
            ctx.moveTo(i * CELL_SIZE, 0);
            ctx.lineTo(i * CELL_SIZE, CONFIG.CANVAS_SIZE);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(0, i * CELL_SIZE);
            ctx.lineTo(CONFIG.CANVAS_SIZE, i * CELL_SIZE);
            ctx.stroke();
        }
    },

    drawFood(pos) {
        ctx.shadowColor = '#ff6348';
        ctx.shadowBlur = 15;
        ctx.fillStyle = CONFIG.COLORS.FOOD;
        ctx.beginPath();
        ctx.arc(
            pos.x * CELL_SIZE + CELL_SIZE / 2,
            pos.y * CELL_SIZE + CELL_SIZE / 2,
            CELL_SIZE / 2 - 2,
            0,
            Math.PI * 2
        );
        ctx.fill();
        ctx.shadowBlur = 0;
    },

    drawSnake(snake, direction) {
        snake.forEach((segment, index) => {
            const x = segment.x * CELL_SIZE;
            const y = segment.y * CELL_SIZE;
            const radius = 5;

            if (index === 0) {
                const gradient = ctx.createRadialGradient(
                    x + CELL_SIZE / 2, y + CELL_SIZE / 2, 2,
                    x + CELL_SIZE / 2, y + CELL_SIZE / 2, CELL_SIZE / 2
                );
                gradient.addColorStop(0, CONFIG.COLORS.SNAKE_HEAD);
                gradient.addColorStop(1, CONFIG.COLORS.SNAKE_BODY);
                ctx.fillStyle = gradient;
            } else {
                const green = 150 + Math.floor((index / snake.length) * 80);
                ctx.fillStyle = `rgb(0, ${green}, 80)`;
            }

            ctx.shadowColor = 'rgba(0,255,136,0.3)';
            ctx.shadowBlur = index === 0 ? 20 : 5;

            ctx.beginPath();
            ctx.roundRect(x + 2, y + 2, CELL_SIZE - 4, CELL_SIZE - 4, radius);
            ctx.fill();
        });
        ctx.shadowBlur = 0;
    },

    drawEyes(head, direction) {
        const showEyes = typeof Settings !== 'undefined' ? Settings.get('showEyes') : true;
        if (!showEyes) return;
        
        const hx = head.x * CELL_SIZE;
        const hy = head.y * CELL_SIZE;
        ctx.fillStyle = 'white';
        let eye1x, eye1y, eye2x, eye2y;
        const eyeSize = 4;
        
        switch (direction) {
            case 'right':
                eye1x = hx + CELL_SIZE - 8; eye1y = hy + 5;
                eye2x = hx + CELL_SIZE - 8; eye2y = hy + CELL_SIZE - 5;
                break;
            case 'left':
                eye1x = hx + 6; eye1y = hy + 5;
                eye2x = hx + 6; eye2y = hy + CELL_SIZE - 5;
                break;
            case 'up':
                eye1x = hx + 5; eye1y = hy + 6;
                eye2x = hx + CELL_SIZE - 5; eye2y = hy + 6;
                break;
            case 'down':
                eye1x = hx + 5; eye1y = hy + CELL_SIZE - 8;
                eye2x = hx + CELL_SIZE - 5; eye2y = hy + CELL_SIZE - 8;
                break;
        }

        ctx.beginPath();
        ctx.arc(eye1x, eye1y, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2x, eye2y, eyeSize, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#1a1a2e';
        const dx = direction === 'right' ? 2 : direction === 'left' ? -2 : 0;
        const dy = direction === 'down' ? 2 : direction === 'up' ? -2 : 0;
        ctx.beginPath();
        ctx.arc(eye1x + dx, eye1y + dy, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(eye2x + dx, eye2y + dy, 2, 0, Math.PI * 2);
        ctx.fill();
    },
    drawWalls() {
        const wallMode = typeof Settings !== 'undefined' ? Settings.get('wallMode') : 'off';
        if (wallMode === 'off') return;
        
        ctx.strokeStyle = '#ff6b35';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#ff6b35';
        ctx.shadowBlur = 10;
        
        const wallPositions = this.getWallPositions();
        wallPositions.forEach(wall => {
            ctx.strokeRect(
                wall.x * CELL_SIZE,
                wall.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
            ctx.fillStyle = 'rgba(255, 107, 53, 0.2)';
            ctx.fillRect(
                wall.x * CELL_SIZE,
                wall.y * CELL_SIZE,
                CELL_SIZE,
                CELL_SIZE
            );
        });
        ctx.shadowBlur = 0;
    },

    getWallPositions() {
        const wallMode = typeof Settings !== 'undefined' ? Settings.get('wallMode') : 'off';
        const gridSize = typeof CONFIG !== 'undefined' ? CONFIG.GRID_SIZE : 20;
        const walls = [];
        
        if (wallMode === 'on') {
            for (let i = 0; i < gridSize; i++) {

                walls.push({ x: i, y: 0 });
                walls.push({ x: i, y: gridSize - 1 })
                walls.push({ x: 0, y: i });
                walls.push({ x: gridSize - 1, y: i });
            }
        } else if (wallMode === 'moving') {
            const center = Math.floor(gridSize / 2);
            for (let i = 0; i < gridSize; i++) {
                if (i % 3 === 0) {
                    walls.push({ x: center - 2, y: i });
                    walls.push({ x: center + 2, y: i });
                }
            }
        }
        
        return walls;
    },

    checkWallCollision(head) {
        const wallMode = typeof Settings !== 'undefined' ? Settings.get('wallMode') : 'off';
        if (wallMode === 'off') return false;
        
        const walls = this.getWallPositions();
        return walls.some(wall => wall.x === head.x && wall.y === head.y);
    },

    drawGameOver(score) {
        ctx.fillStyle = 'rgba(0,0,0,0.7)';
        ctx.fillRect(0, 0, CONFIG.CANVAS_SIZE, CONFIG.CANVAS_SIZE);
        ctx.fillStyle = '#ff4757';
        ctx.font = 'bold 40px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('💀 Game Over', CONFIG.CANVAS_SIZE / 2, CONFIG.CANVAS_SIZE / 2 - 20);
        ctx.fillStyle = '#fff';
        ctx.font = '20px sans-serif';
        ctx.fillText(`Score: ${score}`, CONFIG.CANVAS_SIZE / 2, CONFIG.CANVAS_SIZE / 2 + 40);
    },

    clear() {
        ctx.clearRect(0, 0, CONFIG.CANVAS_SIZE, CONFIG.CANVAS_SIZE);
    },

    render(snake, direction, food, gameOver, score) {
        this.clear();
        this.drawGrid();
        this.drawWalls(); 
        this.drawFood(food);
        this.drawSnake(snake, direction);
        
        if (snake.length > 0 && !gameOver) {
            this.drawEyes(snake[0], direction);
        }

        if (gameOver) {
            this.drawGameOver(score);
        }
    }
};

CanvasRenderingContext2D.prototype.roundRect = function(x, y, w, h, r) {
    if (r > w / 2) r = w / 2;
    if (r > h / 2) r = h / 2;
    this.moveTo(x + r, y);
    this.lineTo(x + w - r, y);
    this.quadraticCurveTo(x + w, y, x + w, y + r);
    this.lineTo(x + w, y + h - r);
    this.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    this.lineTo(x + r, y + h);
    this.quadraticCurveTo(x, y + h, x, y + h - r);
    this.lineTo(x, y + r);
    this.quadraticCurveTo(x, y, x + r, y);
    this.closePath();
    return this;
};