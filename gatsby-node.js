const isDev = process.env.NODE_ENV === 'development'
let token
let url

if (isDev) {
  const env = require('./env')
  token = env.token
  url = env.url
} else {
  url = process.env.NETLIFY_URL
}

exports.onCreateWebpackConfig = c =>
  c.actions.setWebpackConfig({
    plugins: [
      c.plugins.define({
        ANALYTICS_ID: isDev ? null : JSON.stringify(process.env.ANALYTICS_ID),
        NETLIFY_URL: JSON.stringify(url),
      }),
    ],
  })
