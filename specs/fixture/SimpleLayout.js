import {View} from 'backbone.marionette';

module.exports = View.extend({
    template: require('./tpl/SimpleLayout.hbs'),

    initialize: function() {
        var self = this;
        this.promise = function() {
            return new Promise(function(resolve) {
                self.resolve = resolve;
            });
        }
    },

    templateContext: function() {
        return {
            promise: this.promise
        }
    }
});
