const path = require('path');

const PnpWebpackPlugin = require(`pnp-webpack-plugin`);
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    plugins: [PnpWebpackPlugin],
  },
  mode: 'production',
  resolveLoader: {
    plugins: [PnpWebpackPlugin.moduleLoader(module)],
  },
  entry: './src/index.jsx',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index_bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: require.resolve('babel-loader'),
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: { esModule: true },
          },
          { loader: require.resolve('css-loader'), options: { esModule: true } },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|woff2?)$/,
        use: [
          {
            loader: require.resolve('file-loader'),
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: {
            safari10: true,
          },
          output: {
            ascii_only: true,
            comments: false,
          },
        },
        parallel: true,
        cache: true,
      }),
      new OptimizeCSSAssetsPlugin(),
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      hash: true,
      filename: './index.html', // target html
      template: './public/index.html', // source html
    }),
    new MiniCssExtractPlugin(),
    // new FaviconsWebpackPlugin('./public/logo.svg'),
    new BundleAnalyzerPlugin()
  ],
};
