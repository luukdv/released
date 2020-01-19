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
