const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

// Main const
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#main-const
const ABSPATH = path.resolve(__dirname, '../../../');

const PATHS = {
	core: path.resolve(ABSPATH, '../'),
	src: path.resolve(ABSPATH, './src'),
	dist: path.resolve(ABSPATH, './gutenberg/assets'),
};

const externals = require( './externals' );

const alias = {
	'~': path.resolve(PATHS.src, '.'),
	'@src': path.resolve(PATHS.src, '.'),
	'src': path.resolve(PATHS.src, '.'),
	'@editor': path.resolve(PATHS.src, 'admin/gutenberg/editor/'),
	'@blocks': path.resolve(PATHS.src, 'admin/gutenberg/editor/blocks/'),
};


module.exports = {
	// BASE config
	externals: externals,
	entry: {
		// app: PATHS.src,
		'editor': `${PATHS.src}/admin/gutenberg/editor`,
		// module: `${PATHS.src}/your-module.js`,
	},
	output: {
		filename: 'js/[name].js',
		path: PATHS.dist,
		publicPath: '/'
	},
	/*optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true
				}
			}
		}
	},*/
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: '/node_modules/'
		}, {
			test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
			loader: 'file-loader',
			options: {
				publicPath: '../../font',
				outputPath: './font/',
				name: '[name].[contenthash:8].[ext]'
			}
		}, {
			test: /\.(png|jpg|gif|svg)$/,
			use: [
				{
					loader: 'file-loader',
					options: {
						publicPath: '../../img',
						outputPath: './img/',
						name: '[name].[contenthash:8].[ext]'
					}
				},
			],
		}, {
			test: /\.s?css$/,
			use: [
				'style-loader',
				MiniCssExtractPlugin.loader,
				{
					loader: 'css-loader',
					options: {
						sourceMap: true,
						url: true,
					}
				},
				{
					loader: 'resolve-url-loader',
					options: {
						url: true,
					},
				},
				{
					loader: 'postcss-loader',
					options: {sourceMap: true, config: {path: `./postcss.config.js`}}
				},
				{
					loader: 'sass-loader',
					options: {
						// Add common CSS file for variables and mixins.
						data: '@import "@src/common.scss";\n',
						sourceMap: true
					},
				}
			]
		},
		]
	},
	resolve: {
		alias
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'css/[name].css',
		}),
	],
	// externals: externals,
}

