module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine', 'browserify'],
        files: [
            'specs/index.js',
            'specs/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            'specs/**/*.js': 'browserify'
        },
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        browserify: {
            debug: true,
            'transform': [
                [
                    {'global': true},
                    'injectify'
                ]
            ]
        }
    });
};
