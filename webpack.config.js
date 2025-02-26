const path = require('path');

module.exports = {
  entry: './src/app/index.js',  // Entry point for your application
  output: {
    filename: 'bundle.js',  // Output file
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/,  // Load CSS files
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,  // Load images
        use: ['file-loader'],
      },
      {
        test: /\.js$/,  // Transpile JavaScript files using Babel
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,  // Dev server port
  },
};
