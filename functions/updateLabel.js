const api = 'https://api.discogs.com/database/search'
const axios = require('axios')
const currentYear = new Date().getFullYear()
const fauna = require('faunadb')
const q = fauna.query
const client = new fauna.Client({ secret: process.env.FAUNADB })

exports.handler = async event => {
  const labelId = parseInt(event.queryStringParameters.id)

  const getParams = (type, year) =>
    Object.entries({
      label: event.queryStringParameters.name,
      per_page: 1,
      token: process.env.API_TOKEN,
      type,
      year,
    })
      .map(p => p.join('='))
      .join('&')

  const isMainLabel = res =>
    res.data.results[0].label.length &&
    res.data.results[0].label[0].toLowerCase() ===
      event.queryStringParameters.name.toLowerCase()

  const getLatestByYear = async year => {
    const master = await axios.get(`${api}?${getParams('master', year)}`)

    if (master.data.results.length && isMainLabel(master)) {
      return master
    }

    const release = await axios.get(`${api}?${getParams('release', year)}`)

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

    if (release) {
      client.query(
        q.Update(
          q.Select('ref', q.Get(q.Match(q.Index('label_by_id'), labelId))),
          { data: { release } }
        )
      )
    }

    return {
      body: JSON.stringify(release),
      statusCode: 200,
    }
  } catch (e) {
    return {
      body: JSON.stringify({
        error: e.response ? e.response.statusText : e.code,
      }),
      statusCode: e.response ? e.response.status : 400,
    }
  }
}
