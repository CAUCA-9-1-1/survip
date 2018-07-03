interface String {
    toSnakeCase(): string;
    pick(min: number, max?: number): string;
    shuffle(): string;
}

String.prototype.toSnakeCase = function() {
    return this.replace(
        /(?:^|\.?)([A-Z])/g,
        (x, y) => {
            return '_' + y.toLowerCase();
        }).replace(/^_/, '');
};

String.prototype.pick = function(min: number, max: number): string {
    let chars = '';
    const n = (
        typeof max === 'undefined' ? min : min + Math.floor(Math.random() * ( max - min + 1 ))
    );

    for (let i = 0; i < n; i++) {
        chars += this.charAt( Math.floor( Math.random() * this.length ));
    }

    return chars;
};

String.prototype.shuffle = function () {
    const array = this.split('');
    let tmp, current, top = array.length;

    if (top) {
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    }

    return array.join('');
};
