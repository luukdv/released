const got = require('got')
const env = require('./env')

exports.searchLabels = async (req, res) => {
  const api = 'https://api.discogs.com/database/search'
  const query = req.query.search ?
    `per_page=10&type=label&q=${req.query.search}` :
    `per_page=1&type=master&year=${req.query.year}&format=album&label=${req.query.label}`

  const results = await got(`${api}?token=${env.token}&${query}`, { json: true })

  res.set(
    'Access-Control-Allow-Origin',
    req.query.dev ? 'http://localhost:8000' : env.url
  )
  res.status(200).send(results.body.results)
}
