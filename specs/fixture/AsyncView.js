'use strict';

module.exports = Marionette.ItemView.extend({
    template: require('./tpl/SimpleView.hbs'),
    className: 'test',

    promise: function () {
        var _this = this;

        return new Promise(function (resolve) {
            _this.resolve = resolve;
        });
    }
});
