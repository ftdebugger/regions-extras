(function () {
    'use strict';

    /**
     */
    module.exports = Marionette.ItemView.extend({
        template: require('./tpl/SimpleView.hbs'),
        className: 'test',

        promise: function () {
            this._promise = $.Deferred();
            return this._promise;
        }
    });

})();
