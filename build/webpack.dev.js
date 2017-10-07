var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var rootPath = process.cwd();

module.exports = {
  devtool: 'eval-source-map',

  entry: rootPath + "/demo/index.js",
  output: {
    path: rootPath + "/dist",
    filename: "index.js"
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: 'Shang Basic Controls',
      template: rootPath + "/demo/index.tpl",
      filename: 'index.html'
    })
  ],

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


  devServer: {
    contentBase: rootPath + "/",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,//实时刷新
    port: 8888
  }
}
