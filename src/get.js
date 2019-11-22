export default url => {
  return new Promise((resolve, reject) => {
    const r = new XMLHttpRequest()

    r.open('GET', url)
    r.send()

    r.onreadystatechange = () => {
      if (r.readyState === XMLHttpRequest.DONE) {
        if (r.status === 200) {
          resolve(JSON.parse(r.response))
        } else {
          reject()
        }
      }
    }
  })
}
