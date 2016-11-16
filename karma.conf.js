module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        files: [
            'specs/index.js',
            'specs/*.spec.js'
        ],
        exclude: [],
        preprocessors: {
            'specs/**/*.js': 'webpack'
        },
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_WARN,
        autoWatch: true,
        browsers: ['PhantomJS'],
        singleRun: false,
        webpack: {
            module: {
                loaders: [
                    {
                        test: /\.js$/,
                        loader: 'babel-loader',
                        exclude: [/jquery/, /lodash/, /backbone/, /chai/, /es6-shim/]
                    },
                    {
                        test: /\.hbs/,
                        loader: 'injectify'
                    }
                ]
            },
            resolve: {
                alias: {
                    'underscore': 'lodash'
                }
            }
        },

        webpackMiddleware: {
            // webpack-dev-middleware configuration
            // i. e.
            stats: 'errors-only'
        }
    });
};
