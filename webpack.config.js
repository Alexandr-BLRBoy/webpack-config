const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');


module.exports = (env) => {
    return {

        mode: env.mode ?? 'development',
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
                      "style-loader",
                      // Translates CSS into CommonJS
                      "css-loader",
                      // Compiles Sass to CSS
                      "sass-loader",
                    ],
                  },
            ]
        },

        plugins: [
            new HtmlWebpackPlugin ( {template: path.resolve(__dirname, 'src', 'index.html')} ),
            new webpack.ProgressPlugin(),
        ],

        devServer: {
            port: 5000,
            open: true,
        },
    }
};

