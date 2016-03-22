// configure environment
require('es6-shim');

var Backbone = require('backbone');
window.$ = window.jQuery = Backbone.$ = require('jquery');

window.Marionette = require('backbone.marionette');

require('../index').register({
    Handlebars: require('injectify/runtime'),
    Marionette: require('backbone.marionette')
});

// configure libs
require('jasmine-jquery/lib/jasmine-jquery');
