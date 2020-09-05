import initDb from './utils/init-db'

exports.handler = async (event: any, context: any) => {
  if (!context.clientContext.user) {
    return {
      body: JSON.stringify({ error: 'Not allowed' }),
      statusCode: 405,
    }
  }

  const db = initDb()
  const q = db.query
  const userId = context.clientContext.user.sub

  try {
    const response = await db.client.query(
      q.Map(
        q.Paginate(q.Match(q.Index('labels_by_user_id'), userId), {
          size: 99999,
        }),
        q.Lambda('label', q.Select('data', q.Get(q.Var('label'))))
      )
    )

    return {
      body: JSON.stringify(response.data.map(({ users: [], ...rest }) => rest)),
      statusCode: 200,
    }
  } catch (e) {
    return db.error(e)
  }
}
