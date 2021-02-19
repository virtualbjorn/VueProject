const path = require('path');
const mergedirs = require('merge-dirs').default;
const mkdirp = require('mkdirp');
const rmrf = require('rimraf');

const buildPath = path.join(__dirname, '../build');
const distPath = path.join(__dirname, '../dist');
const prerenderPath = path.join(__dirname, '../dist_render');

mkdirp(buildPath)
	.then(() => {
		mergedirs(distPath, buildPath, 'overwrite');
		mergedirs(prerenderPath, buildPath, 'overwrite');
		rmrf('dist', () => {});
		rmrf('dist_render', () => {});
	});
