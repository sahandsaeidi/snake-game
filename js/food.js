const Food = {
    position: { x: 0, y: 0 },

    generate() {
        let newPos;
        let isOnSnake;
        do {
            newPos = {
                x: Math.floor(Math.random() * CONFIG.GRID_SIZE),
                y: Math.floor(Math.random() * CONFIG.GRID_SIZE)
            };
            isOnSnake = Snake.isOnSnake(newPos.x, newPos.y);
        } while (isOnSnake);
        this.position = newPos;
        return this.position;
    },

    getPosition() {
        return this.position;
    },

    isEaten(head) {
        return head.x === this.position.x && head.y === this.position.y;
    }
};