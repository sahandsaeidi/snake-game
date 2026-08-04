const Snake = {
    body: [],
    direction: 'right',
    nextDirection: 'right',

    init() {
        this.body = [
            { x: 10, y: 10 },
            { x: 9, y: 10 },
            { x: 8, y: 10 },
            { x: 7, y: 10 }
        ];
        this.direction = 'right';
        this.nextDirection = 'right';
    },

    getHead() {
        return { ...this.body[0] };
    },

    getBody() {
        return this.body;
    },

    setDirection(dir) {
        const opposites = {
            'up': 'down',
            'down': 'up',
            'left': 'right',
            'right': 'left'
        };
        if (dir !== opposites[this.direction]) {
            this.nextDirection = dir;
        }
    },

    updateDirection() {
        this.direction = this.nextDirection;
    },

    move() {
        const head = this.getHead();
        switch (this.direction) {
            case 'right': head.x++; break;
            case 'left': head.x--; break;
            case 'up': head.y--; break;
            case 'down': head.y++; break;
        }
        return head;
    },

    grow(head) {
        this.body.unshift(head);
    },

    shrink() {
        this.body.pop();
    },

    checkSelfCollision(head) {
        return this.body.some(segment => 
            segment.x === head.x && segment.y === head.y
        );
    },

    checkWallCollision(head) {
        return head.x < 0 || head.x >= CONFIG.GRID_SIZE || 
               head.y < 0 || head.y >= CONFIG.GRID_SIZE;
    },

    isOnSnake(x, y) {
        return this.body.some(segment => 
            segment.x === x && segment.y === y
        );
    }
};