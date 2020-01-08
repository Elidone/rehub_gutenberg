process.env.BABEL_ENV = 'production';
process.env.NODE_ENV = 'production';

const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack')


const buildWebpackConfig = merge(baseWebpackConfig, {
	// BUILD config
	mode: 'production',
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify('production'), // use 'development' unless process.env.NODE_ENV is defined
			NODE_DEBUG: JSON.stringify(false),
		}),
	],
})

module.exports = buildWebpackConfig;

