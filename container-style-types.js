function Box(param) {
    return {
        map: f => Box(f(param)),
        fold: f => f(param),
        inspect: f => {
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
