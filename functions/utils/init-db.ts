const fauna = require('faunadb')

module.exports = () => ({
  client: new fauna.Client({ secret: process.env.FAUNADB }),
  error: (e) => ({
    body: JSON.stringify({
      error: e.requestResult
        ? e.requestResult.responseContent.errors[0].description
        : e.message,
    }),
    statusCode: e.requestResult ? e.requestResult.statusCode : 400,
  }),
  query: fauna.query,
})
