(function () {
    //noinspection BadExpressionStatementJS
    "use strict";

    var Marionette = require("./marionette").getInstance(),
        Region = Marionette.Region;

    module.exports = Region.extend({

        open: function (view) {
            this.listenToOnce(view, 'before:close', this._viewClose);

            if (!this.$placeholder) {
                this.$placeholder = this.$el;
            }

            this.$el.replaceWith(view.el);
        },

        _viewClose: function () {
            var view = this.currentView;
            if (!view) {
                return;
            }

            if (this.$placeholder) {
                view.$el.replaceWith(this.$placeholder);
                delete this.$placeholder;
            }

            Region.prototype.close.call(this);
        }

    })

})();

