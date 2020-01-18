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

  const input = JSON.parse(event.body)
  const labelId = parseInt(input.label.id)
  const userId = input.user

  try {
    await client.query(
      q.Let(
        { match: q.Match(q.Index('label_by_id'), labelId) },
        q.If(
          q.Exists(q.Var('match')),
          q.Update(q.Select('ref', q.Get(q.Var('match'))), {
            data: {
              users: q.Union(
                q.Select(['data', 'users'], q.Get(q.Var('match'))),
                [userId]
              ),
            },
          }),
          q.Create(q.Collection('labels'), {
            data: { id: labelId, users: [userId] },
          })
        )
      )
    )

    return {
      body: JSON.stringify({ success: true }),
      statusCode: 200,
    }
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
}
