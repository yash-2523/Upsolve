let dev = {
    url: "https://upsolve-backend.azurewebsites.net",
}
let prod = {
    url: "https://upsolve-backend.vercel.app",
}

export const config = process.env.NODE_ENV === 'development' ? dev : prod;