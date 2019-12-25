const got = require('got')

exports.handler = async (e, ctx, cb) => {
  let results
  const api = 'https://api.discogs.com/database/search'
  const getQuery = type => {
    return e.queryStringParameters.search
      ? `per_page=10&type=label&q=${e.queryStringParameters.search}`
      : `per_page=1&type=${type}&year=${new Date().getFullYear()}&label=${
          e.queryStringParameters.label
        }`
  }
  const isMainLabel = () =>
    results.results[0].label.length &&
    results.results[0].label[0].toLowerCase() ===
      e.queryStringParameters.label.toLowerCase()

  try {
    results = await got(
      `${api}?token=${process.env.API_TOKEN}&${getQuery('master')}`
    ).json()

    if (e.queryStringParameters.search) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          results: results.results.map(result => ({
            id: result.id,
            img: result.thumb,
            link: result.uri,
            title: result.title,
          })),
        }),
      }
    }

    if (!results.results.length || !isMainLabel()) {
      results = await got(
        `${api}?token=${process.env.API_TOKEN}&${getQuery('release')}`
      ).json()
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        release:
          results.results.length && isMainLabel()
            ? {
                artist: results.results[0].title
                  .split(' - ')[0]
                  .replace(/(.+)\*$/, '$1'),
                img: results.results[0].thumb,
                link: results.results[0].uri,
                title: results.results[0].title.split(' - ')[1],
              }
            : null,
      }),
    }
  } catch (e) {
    return {
      statusCode: e.statusCode ? e.statusCode : 400,
      body: JSON.stringify({
        error: e.statusMessage ? e.statusMessage : e.code,
      }),
    }
  }
}
