var path = require('path');
var rootPath = process.cwd();
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry:  __dirname + "/../src/index.js",
  output: {
    path: __dirname + "/../dist",
    filename: "index.js",
    library: "ShangUI"
  },

  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "es2015"
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }
        ]
      }
    ]
  },

  resolve: {
    modules: [
      "node_modules",
      path.resolve(rootPath, "packages"),
      path.resolve(rootPath, "src"),
    ],
    extensions: [".js", ".css"],
    alias: {
      main: path.resolve(__dirname, '../src'),
      packages: path.resolve(__dirname, '../packages')
    }
  },

  plugins:[
    new ExtractTextPlugin("index.css"),
  ]
}
