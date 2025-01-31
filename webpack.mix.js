const mix = require('laravel-mix')
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.webpackConfig({
  output: {
    chunkFilename: 'js/chunks/[name].[hash:5].js'
  },
  resolve: {
    alias : {
      '@': path.resolve(__dirname, 'resources/assets/js'),
      'public': path.resolve(__dirname, 'public'),
      'node': path.resolve(__dirname, 'node'),
    },
  },
});

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

if (mix.inProduction()) {
  mix.version()
} else {
  mix.sourceMaps()
  mix.browserSync({
    proxy: 'http://laravel-react.test',
  })
}
