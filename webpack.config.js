const path = require('path');
const webpack = require('webpack');

let prod = -process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: true,
                            useCache: prod,
                        }
                    },
                    {
                        loader: 'ngc-webpack',
                        options: {
                            disable: !prod,
                        }
                    },
                ],
                exclude: /node_modules/
            },
            {
                test: /\.scss$/,
                use: ['raw-loader', 'sass-loader'],
            },

            {
                test: /\.html$/,
                use: 'raw-loader',
            },
        ]
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        })
    ]
};
