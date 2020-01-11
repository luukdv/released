const fauna = require('faunadb')
const q = fauna.query
const client = new fauna.Client({ secret: process.env.FAUNADB })

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      body: JSON.stringify({ error: 'Not allowed' }),
      statusCode: 405,
    }
  }

  const data = JSON.parse(event.body)
  const ref = data.ref
  const labels = data.labels

  try {
    await client.query(
      q.Update(q.Ref(q.Collection('users'), ref), { data: { labels } })
    )
  } catch (e) {
    return {
      body: JSON.stringify({
        error: e.requestResult
          ? e.requestResult.responseContent.errors[0].description
          : e.message,
      }),
      statusCode: e.requestResult.statusCode ? e.requestResult.statusCode : 400,
    }
  }

  return {
    body: JSON.stringify({ success: true }),
    statusCode: 200,
  }
}
