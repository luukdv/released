let headers: {
  [key: string]: string
} = {}

export const get = (url: string, options = {}) => request('GET', url, options)
export const post = (url: string, options = {}) => request('POST', url, options)
export const setHeaders = (pair: {}) => (headers = { ...headers, ...pair })

const request = (
  type: string,
  url: string,
  options: { identifier?: string; data?: {} }
): Promise<{
  response: any
  identifier: string | null
}> =>
  new Promise((resolve, reject) => {
    const r = new XMLHttpRequest()
    const identifier = options.identifier ? options.identifier : null

    r.open(type, url)
    Object.keys(headers).forEach((key) => r.setRequestHeader(key, headers[key]))
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
