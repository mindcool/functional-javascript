// Right function applying function and boxing the result
const Right = x => ({
    chain: f => f(x),
    map: f => Right(f(x)),
    fold: (f, g) => g(x),
    inspect: () =>`Right (${x})`
});

// Left function just ignore function and return boxed result
const Left = x => ({
    chain: f => Left(x),
    map: f => Left(x),
    fold: (f, g) => f(x),
    inspect: () => `Left (${x})`
});

// Nullable function check out result and if result is null returning Left and if result is null returning Right
const fromNullable = x =>
    x != null ? Right(x) : Left(x);

const tryCatch = f => {
    try {
        return Right(f())
    } catch(e) {
        return Left(e);
    }
}

const fs = require('fs');
/*
* We will re write get Port function
const getPort = () => {
    try {
        const str = fs.readFileSync('./assets/config.json');
        const config = JSON.parse(str);
        return config.port
    } catch(e) {
        return 3000;
    }
};
*/

const getPort = () =>
    tryCatch(() => fs.readFileSync('./assets/config.json'))
    .chain(f => tryCatch(() => JSON.parse(f)))
    .fold(e => 3000, c => c.port)

const result = getPort();
console.log('result', result);

