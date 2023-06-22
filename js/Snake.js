import { pixels } from './main.js'

export class Snake {

    snake = [];
    hasEaten = false;
    nextPixel;

    constructor(head) {
        this.snake.push(pixels[head.x][head.y]);
        this.head().addToSnake();
    }


    grow(wantedLength) {
        do {
            const snake = this;
            let x = snake.tail().x;
            let y = snake.tail().y;

            if (x === 49) x = -1;

            this.snake.push(pixels[x + 1][y]);
            snake.tail().addToSnake();

        } while (this.snake.length < wantedLength);
    }


    head() {
        return this.snake[0];
    }


    tail() {
        return this.snake[this.snake.length - 1];
    }


    lookUp() {
        let x = this.head().x;
        let y = this.head().y;

        if (x === 0) x = 50;

        this.nextPixel = pixels[x - 1][y];

        return this.nextPixel;
    }


    lookRight() {
        let x = this.head().x;
        let y = this.head().y;

        if (y === 49) y = -1;

        this.nextPixel = pixels[x][y + 1];

        return this.nextPixel;
    }


    lookDown() {
        let x = this.head().x;
        let y = this.head().y;

        if (x === 49) x = -1;

        this.nextPixel = pixels[x + 1][y];

        return this.nextPixel;
    }


    lookLeft() {
        let x = this.head().x;
        let y = this.head().y;

        if (y === 0) y = 50;

        this.nextPixel = pixels[x][y - 1];

        return this.nextPixel;
    }

    move() {

        this.snake.unshift(this.nextPixel);
        this.head().addToSnake();

        if (!this.hasEaten) {
            this.snake.pop().removeFromSnake();
        }
        this.hasEaten = false;
    }

    eat() {
        this.hasEaten = true;
        this.nextPixel.removeFood();
    }

    blink() {
        this.snake.forEach(pixel => {
            pixel.blink();
        })
    }
}