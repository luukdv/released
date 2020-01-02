export default (url, token = null) => {
  return new Promise((resolve, reject) => {
    const r = new XMLHttpRequest()

    r.open('GET', url)
    r.send()

    r.onreadystatechange = () => {
      if (r.readyState !== XMLHttpRequest.DONE) {
        return
      }

      if (r.status === 200) {
        try {
          const parsed = JSON.parse(r.response)

          resolve({ response: parsed, token })
        } catch (e) {
          reject(e)
        }
      } else {
        reject(`${r.status} (${r.statusText})`)
      }
    }
  })
}
