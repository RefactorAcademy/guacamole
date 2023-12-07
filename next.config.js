const withCSS = require('@zeit/next-css')
const withTypescript = require('@zeit/next-typescript')
const { DefinePlugin } = require('webpack')

// https://github.com/zeit/next.js/issues/5225#issuecomment-458032301
if (typeof require !== 'undefined') {
  require.extensions['.css'] = () => {}
}

module.exports = withTypescript(
  withCSS({
    webpack(config, { dev }) {
      config.plugins = config.plugins || []

      config.plugins = [
        ...config.plugins,
        new DefinePlugin({
          __DEV__: dev,
        }),
      ]
      if (dev) {
        config.module.rules.push({
          test: /\.js$/,
          enforce: 'pre',
          exclude: /node_modules/,
          loader: 'eslint-loader',
          options: {
            // Emit errors as warnings for dev to not break webpack build.
            // Eslint errors are shown in console for dev
            emitWarning: dev,
          },
        })
      }

      config.module.rules.push({
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000,
            name: '[name].[ext]',
          },
        },
      })
      return config
    },
    webpackDevMiddleware(config) {
      config.watchOptions = {
        ignored: [/\.git\//, /\.next\//, /node_modules/, /testing/],
      }
      return config
    },
  })
)
