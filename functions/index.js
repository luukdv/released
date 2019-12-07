const got = require('got')
const env = require('./env')

exports.searchLabels = async (req, res) => {
  let results
  const api = 'https://api.discogs.com/database/search'
  const getQuery = type => {
    return req.query.search
      ? `per_page=10&type=label&q=${req.query.search}`
      : `per_page=1&type=${type}&year=${new Date().getFullYear()}&label=${
          req.query.label
        }`
  }
  const isMainLabel = () =>
    results.body.results[0].label.length &&
    results.body.results[0].label[0].toLowerCase() ===
      req.query.label.toLowerCase()

  res.set(
    'Access-Control-Allow-Origin',
    req.query.dev ? 'http://localhost:8000' : env.url
  )

  try {
    results = await got(`${api}?token=${env.token}&${getQuery('master')}`, {
      json: true,
    })

    if (req.query.search) {
      res.status(200).send(
        results.body.results.map(result => ({
          img: result.thumb,
          title: result.title,
          id: result.id,
        }))
      )
      return
    }

    if (!results.body.results.length || !isMainLabel()) {
      results = await got(`${api}?token=${env.token}&${getQuery('release')}`, {
        json: true,
      })
    }

    res.status(200).send({
      release:
        results.body.results.length && isMainLabel()
          ? {
              artist: results.body.results[0].title
                .split(' - ')[0]
                .replace(/(.+)\*$/, '$1'),
              img: results.body.results[0].thumb,
              link: results.body.results[0].uri,
              title: results.body.results[0].title.split(' - ')[1],
            }
          : null,
    })
  } catch (e) {
    res
      .status(e.statusCode ? e.statusCode : 400)
      .send({ error: e.statusMessage ? e.statusMessage : e.code })
  }
}
