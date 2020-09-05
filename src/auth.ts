import gotrue from 'gotrue-js'

export const getParams = () => {
  const hash = document.location.hash

  return hash
    ? hash
        .slice(1)
        .split('&')
        .reduce((list: { [key: string]: string }, param) => {
          const [key, val] = param.split('=')
          list[key] = val

          return list
        }, {})
    : null
}

export default new gotrue({
  APIUrl: 'https://released.netlify.app/.netlify/identity',
  setCookie: true,
})
