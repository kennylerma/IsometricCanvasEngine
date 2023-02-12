module.exports = {
    entry:"./src/Main.ts",
    output: {
        filename: "app.js"
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules:[
            {
                test: /\.ts$/,
                use: [
                    { loader: "ts-loader" }
                ]
            }
        ]
    }
};