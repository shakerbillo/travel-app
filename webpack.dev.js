const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: './src/client/index.js',
	mode: 'production',
	output: {
		filename: 'main.js',
		path: path.resolve(__dirname, 'dist'),
		libraryTarget: 'var',
		library: 'Client',
        assetModuleFilename: 'images/[hash][ext][query]'
	},

	module: {
		rules: [
			{
				test: '/.js$/',
				exclude: /node_modules/,
				loader: 'babel-loader',
			},
			{
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.svg$/,
				type: 'asset/resource',
                
			},
            {
				test: /\.svg$/,
				type: 'asset/inline'
                
			},
            
		],
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: './src/client/views/index.html',
			filename: './index.html',
		}),
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['dist/*'], 
		}),
	],
};
