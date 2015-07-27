(function () {
    'use strict';

    var AbstractRegion = require('./AbstractRegion');

    /**
     * @class ReplaceRegion
     */
    module.exports = AbstractRegion.createRegion({
        name: 'replace',

        attachHtml: function (view) {
            this.listenToOnce(view, 'before:destroy', this._viewDestroy);

            if (!this.$placeholder) {
                this.$placeholder = this.$el;
            }

            this.$el.replaceWith(view.el);
        },

        _viewDestroy: function () {
            var view = this.currentView;

            if (!view) {
                return;
            }

            if (this.$placeholder) {
                view.$el.replaceWith(this.$placeholder);
                delete this.$placeholder;
            }
        }

    });

})();

