(function(){
    //noinspection BadExpressionStatementJS
    'use strict';


    /**
     */
    module.exports = Marionette.ItemView.extend({
        template: require("./tpl/SimpleView.hbs"),
        className: 'test',

        then: function (callback) {
            this._promise = $.Deferred();
            return this._promise.then(callback);
        }
    });

})();
