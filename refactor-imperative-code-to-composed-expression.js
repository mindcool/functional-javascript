function Box(x) {
    return {
        map: f => Box(f(x)),
        fold: f => f(x),
        inspect: f => {
            return `Box${x}`;
        }
    }
}
/*
// First let see the out imperative code
const moneyToFloat = (str) => {
    parseFloat(str.replace(/\$/g, ''))
}

const percentToFloat = (str) => {
    const replaced = str.replace(/\%/g, '')
    const number = parseFloat(replaced)
    return number * 0.01
}

const applyDiscount = (price, discount) => {
    const cost = moneyToFloat(price)
    const savings = percentToFloat(discount)
    return cost - cost * savings
}
*/

// Now we will turn each of our functions to a composable function
// First money to float function
const moneyToFloat = str =>
Box(str)
    .map(s => str.replace(/\$/g, ''))
    .map(s => parseFloat(s))

// Second percent To Float
const percentToFloat = str =>
Box(str)
    .map(s => s.replace(/\%/g, ''))
    .map(s => parseFloat(s))
    .map(s => s * 0.01)

const applyDiscount = (price, discount) =>
    moneyToFloat(price)
    .fold(cost =>
    percentToFloat(discount)
    .fold(savings => cost - cost * savings))

const result = applyDiscount('$5.0', '20%')
console.log(result);

