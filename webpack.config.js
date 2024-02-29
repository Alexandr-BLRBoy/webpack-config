const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');



module.exports = (env) => {
    return {

        mode: env.mode ?? 'production',
        entry: path.resolve(__dirname, 'src', 'index.js'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
        },

        module: {
            rules: [
                {
                    test: /\.html$/i,
                    use: 'html-loader'
                },
                {
                    test: /\.(png|svg|jpg|jpeg|gif)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name]-[hash][ext]'
                    }
                },
                {
                    test: /\.s[ac]ss$/i,
                    use: [
                      // Creates `style` nodes from JS strings
                      MiniCssExtractPlugin.loader,
                      // Translates CSS into CommonJS
                      "css-loader",
                      // Compiles Sass to CSS
                      "sass-loader",
                    ],
                  },
                  {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name]-[hash][ext]'
                    }
                },
            ]
        },

        plugins: [
            new HtmlWebpackPlugin ( {template: path.resolve(__dirname, 'src', 'index.html')} ),
            new webpack.ProgressPlugin(),
            new MiniCssExtractPlugin(),
            new CopyPlugin({
                patterns: [
                  { from: path.resolve(__dirname, 'src', 'files'), to: path.resolve(__dirname, 'build', 'files') },
                ],
              }),
        ],

        devServer: {
            port: 5000,
            open: true,
        },
    }
};

