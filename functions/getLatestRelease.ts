const api = require('./utils/api')
const axios = require('axios')
const capitalize = require('./utils/capitalize')
const currentYear = new Date().getFullYear()

type Data = {
  data: {
    results: [{ label: string; title: string; thumb: string; uri: string }]
  }
}

exports.handler = async (event: any) => {
  const getParams = (type: string, year: number) =>
    Object.entries({
      label: encodeURIComponent(event.queryStringParameters.name),
      per_page: 1,
      token: api.token,
      type,
      year,
    })
      .map((p) => p.join('='))
      .join('&')

  const isMainLabel = (res: Data) =>
    res.data.results[0].label.length &&
    res.data.results[0].label[0].toLowerCase() ===
      event.queryStringParameters.name.toLowerCase()

  const getLatestByYear = async (year: number) => {
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
    let response: null | Data

    response = await getLatestByYear(currentYear)

    if (!response) {
      response = await getLatestByYear(currentYear - 1)
    }

    const getRelease = () => {
      const base = { checked: Date.now() }

      if (!response) {
        return base
      }

      return {
        ...base,
        artist: encodeURIComponent(
          capitalize(
            response.data.results[0].title
              .split(' - ')[0]
              .split(' Feat.')[0]
              .replace(/\*$/, '')
              .replace(/\* /, ' ')
              .replace(/\s\(\d+\)/, '')
          )
        ),
        img: response.data.results[0].thumb,
        link: response.data.results[0].uri,
        title: encodeURIComponent(
          capitalize(
            response.data.results[0].title
              .split(' - ')[1]
              .split(' / ')[0]
              .replace(' EP', '')
          )
        ),
      }
    }

    return {
      body: JSON.stringify(getRelease()),
      statusCode: 200,
    }
  } catch (e) {
    return api.error(e)
  }
}

export {}
