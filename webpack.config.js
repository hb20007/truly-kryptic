const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const process = require('process');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const prod = process.argv.indexOf('-p') !== -1;

if (!process.env.FIREBASE_PROJECT) {
    console.error('FIREBASE_PROJECT env var not set');
    process.exit(1);
}

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
                            // useCache: prod,
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
        new HtmlWebpackPlugin({ template: './index.html', hash: true }),
        new CopyWebpackPlugin([{ from: 'img', to: 'img' }]),
        new webpack.DefinePlugin({
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            FIREBASE_PROJECT: JSON.stringify(process.env.FIREBASE_PROJECT),
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