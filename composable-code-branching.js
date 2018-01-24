// We will define a new type Either which could either be Right or Left
// So lets define right
const Right = (x) => (
    {
        map: f => Right(f(x)),
        // Fold doesn't now is it left or right type so if it is right run the right function
        fold: (f, g) => g(x),
        inspect: () => `Right (${x})`
    }
)
// Our left function completly ignore the function we pass map
const Left = (x) => (
    {
        map: f => Left(x),
        // Fold doesn't now is it left or right type so if it is left run the left function
        fold: (f, g) => f(x),
        inspect: () => `Left (${x})`
    }
)
console.log(Right(3).map(x => x + 1).fold(x => 'error', x => x * 2));
console.log(Left(3).map(x => x + 1).fold(x => 'error', x => x * 4));

const fromNullable = x =>
    x != null ? Right(x) : Left(null)

const findColor  = name => {
    return fromNullable(({red: '#ff4444', blue: '#3b5998', yellow: '#fff68f'})[name]);
};

const resultGreen = findColor('green')
                        .map(c => c.slice(1))
                        .fold(e => 'no color', x => x.toUpperCase());
console.log(resultGreen);

const resultRed = findColor('red')
                        .map(c => c.slice(1))
                        .fold(e => 'no color', x => x.toUpperCase());
console.log(resultRed);