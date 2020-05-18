const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const nodeModulesPath =  path.join(__dirname, './node_modules');
const typescriptIsTransformer = require('typescript-is/lib/transform-inline/transformer').default

var webpackConfig = {
    watch: false,
    mode: "development",
    entry: '/media/justin/3645492238405425/workspace/inspect/tsis/src/main',
    output: {
        path: '/media/justin/3645492238405425/workspace/inspect/tsis/dist',
        filename: 'test-bundle.lb.js',
        chunkFilename: '[name][chunkhash].fe.js',
        libraryTarget: 'commonjs'
    },
    optimization: {
        splitChunks: {
            chunks: 'all'
        }
    },
    resolve: {
        extensions: [
            '.ts',
            '.js'
        ],
        plugins: [new TsconfigPathsPlugin({ configFile: path.join(__dirname, "./tsconfig.json") })],
        modules: [nodeModulesPath]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'awesome-typescript-loader',
                query: {
                    configFileName: path.join(__dirname, "./tsconfig.json"),
                    getCustomTransformers: program => ({
                        before: [typescriptIsTransformer(program)]
                    })
                }
            },
           
        ]
    },
    externals: [
        //add any deps used by gp-plug that doesn't exist in the core application to whitelist
        nodeExternals({
            modulesDir: nodeModulesPath,
        }),
        function (context, request, callback) {
            //exclude libraries gp-pos from bundle since these are peer dependencies
            if (/^(@gaap)/.test(request)) {
                return callback(null, 'commonjs ' + request);
            }
            callback();
        }
    ],
}

module.exports = webpackConfig;