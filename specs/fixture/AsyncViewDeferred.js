'use strict';

module.exports = Marionette.ItemView.extend({
    template: require('./tpl/SimpleView.hbs'),
    className: 'test',

    promise: function () {
        var defer = $.Deferred();
        this.resolve = defer.resolve;
        return defer.promise();
    }
});
