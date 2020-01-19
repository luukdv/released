module.exports = {
  base: 'https://api.discogs.com/database/search',
  token: process.env.API_TOKEN,
  error: e => ({
    body: JSON.stringify({
      error: e.response ? e.response.statusText : e.code,
    }),
    statusCode: e.response ? e.response.status : 400,
  }),
}
