import { StringLiteral } from 'typescript'

const fauna = require('faunadb')

type Err = {
  message: string
  requestResult?: {
    statusCode: number
    responseContent: {
      errors: [
        {
          description: string
        }
      ]
    }
  }
}

module.exports = () => ({
  client: new fauna.Client({ secret: process.env.FAUNADB }),
  error: (e: Err) => ({
    body: JSON.stringify({
      error: e.requestResult
        ? e.requestResult.responseContent.errors[0].description
        : e.message,
    }),
    statusCode: e.requestResult ? e.requestResult.statusCode : 400,
  }),
  query: fauna.query,
})
