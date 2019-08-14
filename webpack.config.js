let path = require('path');

let conf = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'main.js',
        publicPath: 'dist/'
    },
    devServer: {
        overlay: true
    }
}

// conf.devtol creates source.map for debugging code. `source-map` creates map into separeted file
// and `eval-sourcemap` faster but makes main js file bigger, because of this it is used for development.
// Map gives correctly line numbers!
module.exports = (env, options) => {
    let production = Object.is(options.mode, 'production');

    conf.devtool = production ? 'source-map' : 'eval-source-map';
    return conf;
};