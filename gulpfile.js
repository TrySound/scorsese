var gulp = require('gulp');
var rollup = require('rollup').rollup;

gulp.task('build', function () {
	return rollup({
		entry: 'src/index.js'
	}).then(function (bundle) {
		return Promise.all([
			bundle.write({
				format: 'cjs',
				dest: 'dist/scorsese.js'
			}),
			bundle.write({
				format: 'umd',
				moduleName: 'scorsese',
				dest: 'dist/scorsese.standalone.js'
			})
		]);
	});
});

gulp.task('test', ['build'], function () {

});

gulp.task('default', ['build', 'test']);
