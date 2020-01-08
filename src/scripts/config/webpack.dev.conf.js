const webpack =  require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
  // DEV config
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
	watch: true,
	watchOptions: {
		ignored: /node_modules/
	},
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[file].map'
    }),
	  new webpack.DefinePlugin({
		  NODE_ENV: JSON.stringify('development'), // use 'development' unless process.env.NODE_ENV is defined
		  NODE_DEBUG: JSON.stringify(true),
	  })
  ]
})

module.exports = devWebpackConfig;
