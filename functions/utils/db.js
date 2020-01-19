const fauna = require('faunadb')

module.exports = {
  client: new fauna.Client({ secret: process.env.FAUNADB }),
  query: fauna.query,
}
