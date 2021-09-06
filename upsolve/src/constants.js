let dev = {
    url: "https://20.198.103.171",
}
let prod = {
    url: "https://20.198.103.171",
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;