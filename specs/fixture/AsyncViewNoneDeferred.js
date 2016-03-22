'use strict';

module.exports = Marionette.ItemView.extend({
    template: require('./tpl/SimpleView.hbs'),
    className: 'test',

    promise: function () {
        return {data: 123};
    }
});
