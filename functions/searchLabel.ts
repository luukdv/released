const api = require('./utils/api')
const axios = require('axios')

type Result = {
  id: number
  uri: string
  thumb: string
  title: string
}

exports.handler = async (event: any) => {
  const params = Object.entries({
    per_page: 10,
    q: encodeURIComponent(event.queryStringParameters.query),
    token: api.token,
    type: 'label',
  })
    .map((p) => p.join('='))
    .join('&')

  try {
    const response = await axios.get(`${api.base}?${params}`)

    return {
      statusCode: 200,
      body: JSON.stringify({
        results: response.data.results.map((result: Result) => ({
          id: result.id,
          img: result.thumb,
          link: result.uri,
          name: encodeURIComponent(result.title.replace(/\s\(\d+\)/, '')),
        })),
      }),
    }
  } catch (e) {
    return api.error(e)
  }
}

export {}
