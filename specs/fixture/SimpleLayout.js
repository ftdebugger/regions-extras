'use strict';

module.exports = Marionette.LayoutView.extend({
    template: require('./tpl/SimpleLayout.hbs'),

    initialize: function() {
        var self = this;
        this.promise = function() {
            return new Promise(function(resolve) {
                self.resolve = resolve;
            });
        }
    },

    templateHelpers: function() {
        return {
            promise: this.promise
        }
    }
});
