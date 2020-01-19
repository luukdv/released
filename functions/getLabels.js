const db = require('./utils/db')
const q = db.query

exports.handler = async event => {
  const userId = event.queryStringParameters.user

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
      body: JSON.stringify(response.data.map(({ users, ...rest }) => rest)),
      statusCode: 200,
    }
  } catch (e) {
    return db.error(e)
  }
}
