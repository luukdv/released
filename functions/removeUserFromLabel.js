const initDb = require('./utils/init-db')

exports.handler = async event => {
  if (event.httpMethod !== 'POST') {
    return {
      body: JSON.stringify({ error: 'Not allowed' }),
      statusCode: 405,
    }
  }

  const db = initDb()
  const q = db.query
  const input = JSON.parse(event.body)
  const labelId = parseInt(input.label)
  const userId = input.user

  try {
    await db.client.query(
      q.Let(
        { doc: q.Get(q.Match(q.Index('label_by_id'), labelId)) },
        q.Update(q.Select('ref', q.Var('doc')), {
          data: {
            users: q.Difference(q.Select(['data', 'users'], q.Var('doc')), [
              userId,
            ]),
          },
        })
      )
    )

    return {
      body: JSON.stringify({ success: true }),
      statusCode: 200,
    }
  } catch (e) {
    return db.error(e)
  }
}
