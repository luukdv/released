const axios = require('axios')

exports.handler = async e => {
  let response
  const api = 'https://api.discogs.com/database/search'
  const getQuery = type => {
    return e.queryStringParameters.search
      ? `per_page=10&type=label&q=${e.queryStringParameters.search}`
      : `per_page=1&type=${type}&year=${new Date().getFullYear()}&label=${
          e.queryStringParameters.label
        }`
  }
  const isMainLabel = () =>
    results.data.results[0].label.length &&
    results.data.results[0].label[0].toLowerCase() ===
      e.queryStringParameters.label.toLowerCase()

  try {
    results = await axios.get(
      `${api}?token=${process.env.API_TOKEN}&${getQuery('master')}`
    )

    if (e.queryStringParameters.search) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          results: results.data.results.map(result => ({
            id: result.id,
            img: result.thumb,
            link: result.uri,
            title: result.title,
          })),
        }),
      }
    }

    if (!results.data.results.length || !isMainLabel()) {
      results = await axios.get(
        `${api}?token=${process.env.API_TOKEN}&${getQuery('release')}`
      )
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        release:
          results.data.results.length && isMainLabel()
            ? {
                artist: results.data.results[0].title
                  .split(' - ')[0]
                  .replace(/(.+)\*$/, '$1'),
                img: results.data.results[0].thumb,
                link: results.data.results[0].uri,
                title: results.data.results[0].title.split(' - ')[1],
              }
            : null,
      }),
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
