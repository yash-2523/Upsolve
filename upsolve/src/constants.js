let dev = {
    url: "http://localhost:4000",
}
let prod = {
    url: "",
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;