class TailwindColor {

    constructor(options) {
        const {
            colors = [
                'gray',
                'red',
                'yellow',
                'green',
                'blue',
                'indigo',
                'purple',
                'pink'
            ],
            range = [
                1,9
            ],
            prefix = 'bg',
        } = options || {};

        this.colors = colors;
        this.range = {
            min: range[0],
            max: range[1]
        };
        this.prefix = prefix;

        this.tempColors = [];
    }

    pick() {
        const number = this.constructor.random(this.range.min, this.range.max) * 100;
        const indexColor = this.constructor.random(0, this.colors.length - 1);
        return `${this.prefix}-${this.colors[indexColor]}-${number}`;
    }

    color(colors = '') {
        const isArray = Array.isArray(colors);
        if (!isArray) this.tempColors.push(colors);
        else colors.forEach(color => this.tempColors.push(color));
        return this;
    }

    add() {
        this.tempColors.forEach(color => this.colors.push(color));
    }

    remove() {
        this.tempColors.forEach(color => {
            const index = this.colors.indexOf(color);
            if (index >= 0) this.colors.splice(index, 1);
        });
    }

    static random(min = 1, max = 9) {
        return Math.floor(Math.random() * max) + min;
    }
}

module.exports = TailwindColor;
