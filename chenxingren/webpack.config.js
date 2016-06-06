module.exports.getConfig = function(type) {

  var isDev = type === 'development';

  var config = {
    entry: './app/scripts/main.js',
    devtool: 'inline-source-map',
    debug: true,
    output: {
      path: __dirname,
      filename: 'main.js'
    },
    module: {
      loaders: [{
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015']
        }
      }]
    },
    resolve: {
      extensions: ['', '.js', '.jsx']
    }
  };

  if(isDev){
    config.devtool = 'eval';
  }

  return config;
}