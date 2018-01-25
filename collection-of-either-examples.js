const Right = (x) => (
    {
        chain: f => f(x),
        map: f => Right(f(x)),
        inspect: () => `Right (${x})`,
        fold: (f, g) => g(x)
    }
)

const Left = (x) => (
    {
        chain: f => Left(x),
        map: f => Left(x),
        fold: (f, g) => f(x),
        inspect: () => `Left (${x})`
    }
)

const fromNullable = x =>
    x != null ? Right(x) : Left(x);

    const tryCatch = f => {
        try {
            return Right(f())
        } catch(e) {
            return Left(e);
        }
    }



// In this part we see imperative codes
// Convert them to functional codes
const openSite = () => {
    if (current_user) {
        return renderPage(current_user);
    } else {
        return showLogin();
    }
}

// Thats simple branching with functional code
const openSite = () =>
    // Returns Right(x) if it is not null and Left(x) if it is null
    fromNullable(current_user)
    // If not null renderPage, if null showLogin
    .fold(showLogin, renderPage)





