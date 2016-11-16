import {View} from 'backbone.marionette';
import $ from 'jquery';

module.exports = View.extend({
    template: require('./tpl/SimpleView.hbs'),
    className: 'test',

    promise: function () {
        var defer = $.Deferred();
        this.resolve = defer.resolve;
        return defer.promise();
    }
});
