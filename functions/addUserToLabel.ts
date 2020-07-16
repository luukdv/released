const initDb = require('./utils/init-db')

exports.handler = async (event: any, context: any) => {
  if (event.httpMethod !== 'POST' || !context.clientContext.user) {
    return {
      body: JSON.stringify({ error: 'Not allowed' }),
      statusCode: 405,
    }
  }

  const db = initDb()
  const q = db.query
  const input = JSON.parse(event.body)
  const label = input.label
  const labelId = parseInt(label.id)
  const userId = context.clientContext.user.sub

  try {
    await db.client.query(
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
            data: { ...label, users: [userId] },
          })
        )
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

export {}
