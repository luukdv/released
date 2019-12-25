const isDev = process.env.NODE_ENV === 'development'
let endpoint
let url

if (isDev) {
  const env = require('./env')
  endpoint = env.endpoint
  url = env.url
} else {
  endpoint = process.env.API_ENDPOINT
  url = process.env.NETLIFY_URL
}

exports.onCreateWebpackConfig = c =>
  c.actions.setWebpackConfig({
    plugins: [
      c.plugins.define({
        ANALYTICS_ID: isDev ? null : JSON.stringify(process.env.ANALYTICS_ID),
        API_ENDPOINT: JSON.stringify(endpoint),
        NETLIFY_URL: JSON.stringify(url),
      }),
    ],
  })
