const got = require('got')

exports.searchLabels = async (req, res) => {
  const api = 'https://api.discogs.com/database/search'
  const token = ''
  const query = process && process.argv ? process.argv[1] : ''
  const results = await got(
    `${api}?token=${token}&per_page=10&type=label&q=${query}`,
    { json: true }
  )

  res.status(200).send(results.body.results)
}
