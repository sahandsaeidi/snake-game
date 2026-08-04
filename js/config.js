const CONFIG = {
    GRID_SIZE: 20,
    CANVAS_SIZE: 400,
    INITIAL_SPEED: 150,
    MIN_SPEED: 80,
    SPEED_STEP: 10,
    SCORE_FOR_SPEED: 5,
    COLORS: {
        BACKGROUND: '#1a1a2e',
        SNAKE_HEAD: '#00ff88',
        SNAKE_BODY: '#00b894',
        FOOD: '#ff4757',
        GRID: 'rgba(255,255,255,0.05)',
        BORDER: '#00d2ff'
    }
};

const CELL_SIZE = CONFIG.CANVAS_SIZE / CONFIG.GRID_SIZE;