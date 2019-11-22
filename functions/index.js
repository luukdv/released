const got = require('got')
const env = require('./env')

exports.searchLabels = async (req, res) => {
  const api = 'https://api.discogs.com/database/search'
  const results = await got(
    `${api}?token=${env.token}&per_page=10&type=label&q=${req.query.search}`,
    { json: true }
  )

  res.set(
    'Access-Control-Allow-Origin',
    req.query.dev ? 'http://localhost:8000' : env.url
  )
  res.status(200).send(results.body.results)
}
