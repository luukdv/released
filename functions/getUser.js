const fauna = require('faunadb')
const q = fauna.query
const client = new fauna.Client({ secret: process.env.FAUNADB })

exports.handler = async event => {
  const id = event.queryStringParameters.id
  let response
  let data

  try {
    response = await client.query(
      q.Get(q.Match(q.Index('by_id'), id))
    )
  } catch (e) {
    try {
      response = await client.query(
        q.Create(q.Collection('users'), {
          data: { id, labels: [] },
        })
      )
    } catch(e) {
      return {
        body: JSON.stringify({
          error: e.requestResult ? e.requestResult.responseContent.errors[0].description : e.message,
        }),
        statusCode: e.requestResult.statusCode ? e.requestResult.statusCode : 400,
      }
    }
  }

  return {
    body: JSON.stringify(response.data),
    statusCode: 200,
  }
}
