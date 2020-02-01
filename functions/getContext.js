exports.handler = async (event, context) => {
  return {
    body: JSON.stringify(context),
    statusCode: 200,
  }
}
