exports.onCreateWebpackConfig = c =>
  c.actions.setWebpackConfig({
    plugins: [
      c.plugins.define({
        NETLIFY_URL:
          process.env.NODE_ENV === 'development'
            ? JSON.stringify(require('./env').url)
            : process.env.NETLIFY_URL,
      }),
    ],
  })
