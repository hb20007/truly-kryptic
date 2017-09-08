const path = require('path');

let prod = -process.env.NODE_ENV === 'production';

module.exports = {
    entry: './src/main.ts',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    // {
                    //     /**
                    //      *  MAKE SURE TO CHAIN VANILLA JS CODE, I.E. TS COMPILATION OUTPUT.
                    //      */
                    //     loader: 'ng-router-loader',
                    //     options: {
                    //         loader: 'async-import',
                    //         genDir: 'compiled',
                    //         aot: prod,
                    //     }
                    // },
                    {
                        loader: 'awesome-typescript-loader',
                        options: {
                            transpileOnly: true,
                            useCache: prod,
                        }
                    },
                    // {
                    //     loader: 'ngc-webpack',
                    //     options: {
                    //         disable: !prod,
                    //     }
                    // },
                    {
                        loader: 'angular2-template-loader'
                    }
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
    }
};
