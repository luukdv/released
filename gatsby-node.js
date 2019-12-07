const isDev = process.env.NODE_ENV === 'development'
let endpoint

if (isDev) {
  const env = require('./env')
  endpoint = env.endpoint
} else {
  endpoint = process.env.GATSBY_API_ENDPOINT
}

exports.onCreateWebpackConfig = c =>
  c.actions.setWebpackConfig({
    plugins: [
      c.plugins.define({
        ANALYTICS_ID: isDev ? null : JSON.stringify(process.env.ANALYTICS_ID),
        API_ENDPOINT: JSON.stringify(endpoint),
      }),
    ],
  })
