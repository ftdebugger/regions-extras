(function () {
    //noinspection BadExpressionStatementJS
    "use strict";

    var Marionette = require("./marionette").getInstance(),
        Region = Marionette.Region;

    module.exports = Region.extend({

        attachHtml: function (view) {

            if (!this.$placeholder) {
                this.$placeholder = this.$el;
            }

            this.$el.replaceWith(view.el);
        },

        empty: function () {

            var view = this.currentView;

            if (!view) {
                return;
            }

            if (this.$placeholder) {
                view.$el.replaceWith(this.$placeholder);
                delete this.$placeholder;
            }

            Region.prototype.empty.call(this);
        }

    })

})();

