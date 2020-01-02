import React from 'react'
import { Helmet } from 'react-helmet'

export default React.memo(() => (
  <Helmet>
    <title>Released</title>
    <meta
      name="description"
      content="Keep up with new music from your favorite labels 📡"
    />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    {process.env.NODE_ENV !== 'development' && (
      <script>
        {`
        (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
        (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
        m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
        })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

        ga('create', '${process.env.ANALYTICS_ID}', 'auto');
        ga('send', 'pageview');
      `}
      </script>
    )}
  </Helmet>
))
