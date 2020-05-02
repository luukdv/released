const api = require('./utils/api')
const axios = require('axios')
const currentYear = new Date().getFullYear()

exports.handler = async (event) => {
  const getParams = (type, year) =>
    Object.entries({
      label: encodeURIComponent(event.queryStringParameters.name),
      per_page: 1,
      token: api.token,
      type,
      year,
    })
      .map((p) => p.join('='))
      .join('&')

  const isMainLabel = (res) =>
    res.data.results[0].label.length &&
    res.data.results[0].label[0].toLowerCase() ===
      event.queryStringParameters.name.toLowerCase()

  const getLatestByYear = async (year) => {
    const master = await axios.get(`${api.base}?${getParams('master', year)}`)

    if (master.data.results.length && isMainLabel(master)) {
      return master
    }

    const release = await axios.get(`${api.base}?${getParams('release', year)}`)

    if (release.data.results.length && isMainLabel(release)) {
      return release
    }
  }

  try {
    let response

    response = await getLatestByYear(currentYear)

    if (!response) {
      response = await getLatestByYear(currentYear - 1)
    }

    const release = { checked: Date.now() }

    if (response) {
      release.artist = encodeURIComponent(
        response.data.results[0].title
          .split(' - ')[0]
          .replace(/(.+)\*$/, '$1')
          .replace(/\s\(\d+\)/, '')
      )
      release.img = response.data.results[0].thumb
      release.link = response.data.results[0].uri
      release.title = encodeURIComponent(
        response.data.results[0].title.split(' - ')[1]
      )
    }

    return {
      body: JSON.stringify(release),
      statusCode: 200,
    }
  } catch (e) {
    return api.error(e)
  }
}
