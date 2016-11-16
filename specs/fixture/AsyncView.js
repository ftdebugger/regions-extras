import {View} from 'backbone.marionette';

module.exports = View.extend({
    template: require('./tpl/SimpleView.hbs'),
    className: 'test',

    promise: function () {
        var _this = this;

        return new Promise(function (resolve) {
            _this.resolve = resolve;
        });
    }
});
