import initDb from './utils/init-db'

exports.handler = async (event: any) => {
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
  const release = input.release

  try {
    await db.client.query(
      q.Let(
        { match: q.Match(q.Index('label_by_id'), labelId) },
        q.If(
          q.Exists(q.Var('match')),
          q.Update(q.Select('ref', q.Get(q.Var('match'))), {
            data: { release },
          }),
          null
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
