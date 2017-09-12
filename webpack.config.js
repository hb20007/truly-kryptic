const path = require('path');
const webpack = require('webpack');

let prod = -process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
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
                use: ['to-string-loader', 'css-loader', 'sass-loader'],
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
        }),
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular([\\\/])core/,
            root('./src'), // location of your src
            { }
        )
    ]

};

function root(__path) {
    return path.join(__dirname, __path);
}