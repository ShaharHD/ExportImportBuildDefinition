var path = require("path");
var webpack = require("webpack");
var CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    target: "web",
    entry: {
        Vendor: [
            "./node_modules/file-saver/dist/FileSaver.min.js",
            "./node_modules/uuid/index.js"
        ],
        Export: "./src/ExportBuildDefinition.ts",
        Import: "./src/ImportBuildDefinition.ts"
    },
    output: {
        filename: "src/[name].js",
        libraryTarget: "amd"
    },
    externals: [
        /^VSS\/.*/, /^TFS\/.*/, /^q$/
    ],

    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'all'
                }
            }
        }
    },

    resolve: {
        extensions: [
            ".webpack.js",
            ".web.js",
            ".ts",
            ".tsx",
            ".js"],
        modules: [
            "src",
            "node_modules"
        ]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                enforce: "pre",
                loader: "tslint-loader",
                options: {
                    emitErrors: true,
                    failOnHint: true
                }
            },
            {
                test: /\.tsx?$/,
                loader: "ts-loader"
            },
            {
                test: /\.s?css$/,
                loaders: ["style", "css", "sass"]
            }
        ]
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: "./src/*.html", to: "./" },
            { from: "./css", to: "css" },
            { from: "./libs", to: "libs" },
            { from: "./fonts", to: "fonts" },
            { from: "./images", to: "images" },
            { from: "./screenshots", to: "screenshots" },
            { from: "./vss-extension.json", to: "vss-extension.json" },
            { from: "./intro.md", to: "intro.md" },
            { from: "./license.txt", to: "license.txt" }
        ]),
        // new webpack.optimize.UglifyJsPlugin({
        //     comments: false,
        //     compress: {
        //         warnings: true,
        //         drop_console: true
        //     }
        // }),
	// new webpack.optimize.CommonsChunkPlugin({
    //         name: "Vendor",
    //         minChunks: Infinity,
    //     })
    ]
};