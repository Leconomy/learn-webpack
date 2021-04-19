
const path = require('path');
module.exports = {
  mode: 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist', process.env.PLATFORM || 'h5'),
    filename: 'main.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist', process.env.PLATFORM || 'h5')
  },
  resolve: {
    extensions: ['.jsx', '.js', '.json', '.css']
  },
  resolveLoader: {// 配置查找loader的目录
    modules: [
      'node_modules',
      path.resolve(__dirname, 'loaders')
    ]
  },
  module: {
    rules: [

      {
        test: /\.js|jsx$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react']
            }
          },
          {
            loader: 'preprocess-loader',
            options: {
              context: {
                // 分端配置
                H5: process.env.PLATFORM === 'h5',
                APP: process.env.PLATFORM === 'app'
              }
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            // 在项目根目录里创建loaders目录，并有子目录preprocess-loader
            loader: 'preprocess-loader',
            options: {
              context: {
                H5: process.env.PLATFORM === 'h5',
                APP: process.env.PLATFORM === 'app'
              }
            }
          }
        ]
      }

    ]
  }
}