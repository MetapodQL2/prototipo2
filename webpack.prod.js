const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizer = require('css-minimizer-webpack-plugin');
const Terser = require ('terser-webpack-plugin');

module.exports = {

    mode: 'production',
    output : {
        clean: true,
        filename: 'main.[fullhash].js',
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                loader: 'html-loader',
                options: {
                    sources: false,
                },
            },
            {
                test: /\.css$/i,
                exclude: /styles.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /styles.css$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'asset/images',
                }
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            }
        ]
    },

    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizer(),
            new Terser(),
        ]
    },

    plugins: [
        new HtmlWebPackPlugin({
             template: './src/views/index.html',
             filename: './index.html',
             inject: 'body'
        }), 

        new MiniCssExtractPlugin({
            filename: 'style.[fullhash].css',
            ignoreOrder: true,
        }),
        new CopyPlugin({
            patterns: [
              { from: "./src/assets/", to: "assets/", noErrorOnMissing: true },
            ],
        }),
    ]

}