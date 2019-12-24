import gotrue from 'gotrue-js'
import env from './env'

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
  APIUrl: `${env.url}/.netlify/identity`,
  setCookie: true,
})
