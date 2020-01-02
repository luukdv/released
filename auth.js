import gotrue from 'gotrue-js'

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
  APIUrl: `${NETLIFY_URL}/.netlify/identity`, // eslint-disable-line no-undef
  setCookie: true,
})
