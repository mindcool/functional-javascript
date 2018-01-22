const Box = x => ({
    map: f => Box(f(x)),
    fold: f => f(x),
    inspect: () => `Box(${x})`
})

const nextCharForNumberString = str =>
    Box(str)
    .map(s => s.trim())
    .map(s => new Number(s))
    .map(s => s + 1)
    .map(s => String.fromCharCode(s))
    .fold(s => s.toLowerCase())

console.log(nextCharForNumberString('  64  '));
