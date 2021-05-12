let dev = {
    url: "https://up-solve.herokuapp.com",
}
let prod = {
    url: "https://up-solve.herokuapp.com",
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;