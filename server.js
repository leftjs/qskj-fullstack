/*eslint no-console:0 */
'use strict';
require('core-js/fn/object/assign');
const path = require('path')
const express = require('express')
const webpack = require('webpack');
// const WebpackDevServer = require('webpack-dev-server');
const config = require('./webpack.config');
const open = require('open');
const fallback = require('express-history-api-fallback')


// new WebpackDevServer(webpack(config), config.devServer)
// .listen(config.port, 'localhost', (err) => {
//   if (err) {
//     console.log(err);
//   }
//   console.log('Listening at localhost:' + config.port);
//   console.log('Opening your system browser...');
//   open('http://localhost:' + config.port + '/webpack-dev-server/' + 'admin.html');
// });

var compiler = webpack(config)
var app = express()
app.use(require('webpack-dev-middleware')(compiler, {
	lazy: false,
	noInfo: true,
	publicPath: config.output.publicPath,
	quiet: false,
	stats: config.compiler.stats
}))

app.use(require('webpack-hot-middleware')(compiler))

app.get('/admin', function(req,res) {
	res.sendFile(path.resolve(__dirname, 'src', 'admin.html'))
})
app.get('/', function(req,res) {
	res.sendFile(path.resolve(__dirname, 'src', 'main.html'))
})

app.use('/admin/*', fallback(path.resolve(__dirname, 'src', 'admin.html')))
app.use(express.static('/assets'));
app.use('/*', fallback(path.resolve(__dirname, 'src', 'main.html')))




var port = config.port;
var hostname = 'localhost';

app.listen(port, hostname, (err) => {
	if (err) {
		return;
	}
	console.log(`Server is now running at http://${hostname}:${port}.`);
});


open('http://localhost:' + port);