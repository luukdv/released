let headers = {}

export const get = (url, options = {}) => request('GET', url, options)
export const post = (url, options = {}) => request('POST', url, options)
export const setHeaders = pair => (headers = { ...headers, ...pair })

const request = (type, url, options) =>
  new Promise((resolve, reject) => {
    const r = new XMLHttpRequest()
    const identifier = options.identifier ? options.identifier : null

    r.open(type, url)
    Object.keys(headers).forEach(key => r.setRequestHeader(key, headers[key]))
    r.send(options.data ? JSON.stringify(options.data) : null)

    r.onreadystatechange = () => {
      if (r.readyState !== XMLHttpRequest.DONE) {
        return
      }

      if (r.status !== 200) {
        reject(`${r.status} (${r.statusText})`)
        return
      }

      try {
        const parsed = JSON.parse(r.response)

        resolve({ response: parsed, identifier })
      } catch (e) {
        reject(e)
      }
    }
  })
