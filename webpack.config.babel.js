import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import FaviconsWebpackPlugin from 'favicons-webpack-plugin'

const DIST_DIR = path.join(__dirname, 'dist')
const CLIENT_DIR = path.join(__dirname, 'client')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: './index.html',
  filename: 'index.html',
  inject: 'body'
})
const FaviconsWebpackPluginConfig = new FaviconsWebpackPlugin(
  './assets/favicon.png'
)

export default {
  context: CLIENT_DIR,

  entry: [path.join(CLIENT_DIR, 'index.js')],

  output: {
    path: DIST_DIR,
    publicPath: '/',
    filename: 'index_bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      },
      {
        test: /\.woff($|\?)|\.woff2($|\?)|\.ttf($|\?)|\.eot($|\?)|\.svg($|\?)/,
        loader: 'url-loader'
      },
      {
        test: /\.ico$/,
        loader: 'file-loader'
      },

      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader']
      }
    ]
  },

  devServer: {
    proxy: {
      '/api/*': {
        target: 'http://localhost:8080'
      }
    },
    port: '3000'
  },

  plugins: [HtmlWebpackPluginConfig, FaviconsWebpackPluginConfig]
}
