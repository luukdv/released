import gotrue from 'gotrue-js'

const url =
  process.env.NODE_ENV === 'development'
    ? JSON.stringify(require('./env').url)
    : process.env.URL

export const getParams = () => {
  const hash = document.location.hash

  return hash
    ? hash
        .slice(1)
        .split('&')
        .reduce((list, param) => {
          const [key, val] = param.split('=')
          list[key] = val

          return list
        }, {})
    : null
}

export default new gotrue({
  APIUrl: `${url}/.netlify/identity`,
  setCookie: true,
})
