let path = require('path');
let ExtractTextPlugin = require("extract-text-webpack-plugin");

let conf = {
    entry: './src/index.jsx',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
              fallback: "style-loader",
              use: ["css-loader", "sass-loader"]
            })
          },
          {
            test:/\.(js|jsx)?$/,
            use: ['babel-loader']
         }
        ]
      },
      plugins: [
        new ExtractTextPlugin('style.css')
      ],
    devServer: {
        overlay: true
    }
}

// conf.devtol creates source.map for debugging code. `source-map` creates map into separeted file
// and `eval-sourcemap` faster but makes main js file bigger, because of this it is used for development.
// Map gives correctly line numbers!
module.exports = (env, options) => {
    let production = Object.is(options.mode, 'production');

    conf.devtool = production
        ? 'source-map'
        : 'eval-source-map';
    return conf;
};