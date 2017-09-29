const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const process = require('process');

const prod = process.argv.indexOf('-p') !== -1;

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
                            useCache: prod,
                        }
                    },
                    // {
                    //     loader: 'ngc-webpack',
                    //     options: {
                    //         disable: true // !prod,
                    //     }
                    // },
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
        // prod && 
        new CopyWebpackPlugin([{ from: 'index.html', to: 'index.html' }]),
        new CopyWebpackPlugin([{ from: 'img', to: 'img' }]),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular([\\\/])core/,
            root('./src'), // location of your src
            { }
        )
    ].filter(Boolean),

};

function root(__path) {
    return path.join(__dirname, __path);
}