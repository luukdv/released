const request = (type, url, options) => {
  return new Promise((resolve, reject) => {
    const r = new XMLHttpRequest()
    const token = options.token ? options.token : null

    r.open(type, url)
    r.send(options.data ? options.data : null)

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

        resolve({ response: parsed, token })
      } catch (e) {
        reject(e)
      }
    }
  })
}

export const get = (url, options = {}) => request('GET', url, options)
export const post = (url, options = {}) => request('POST', url, options)
