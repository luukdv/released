let endpoint

if (process.env.NODE_ENV === 'development') {
  const env = require('./env')
  endpoint = env.endpoint
} else {
  endpoint = process.env.GATSBY_API_ENDPOINT
}

exports.onCreateWebpackConfig = c =>
  c.actions.setWebpackConfig({
    plugins: [
      c.plugins.define({
        API_ENDPOINT: JSON.stringify(endpoint),
      }),
    ],
  })
