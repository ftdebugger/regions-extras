(function () {
    //noinspection BadExpressionStatementJS
    "use strict";

    var Region = Marionette.Region;

    module.exports = Region.extend({

        open: function (view) {
            if (!this.$placeholder) {
                this.$placeholder = this.$el;
            }

            this.$el.replaceWith(view.el);
        },

        close: function () {
            Region.prototype.close.call(this);

            if (this.$placeholder) {
                this.$el.replaceWith(this.$placeholder);
                delete this.$placeholder;
            }
        }

    })

})();
