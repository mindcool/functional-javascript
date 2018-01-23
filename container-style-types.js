function Box(param) {
    return {
        map: function (fn) { return Box(fn(param)); },
        fold: function (fn) { return fn(param) },
        inspect: function () {
            return `Box(${param})`;
        }
    }
}

    const nextCharForNumberString = str =>
        Box(str)
            .map(s => s.trim())
            .map(s => new Number(s))
            .map(s => s + 1)
            .map(s => String.fromCharCode(s))
            .fold(s => s.toLowerCase());

    console.log(nextCharForNumberString('  64  '));
