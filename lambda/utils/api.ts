export default {
  base: 'https://api.discogs.com/database/search',
  token: process.env.API_TOKEN,
  error: (e: {
    code: number
    response?: {
      status: number
      statusText: string
    }
  }) => ({
    body: JSON.stringify({
      error: e.response ? e.response.statusText : e.code,
    }),
    statusCode: e.response ? e.response.status : 400,
  }),
}
