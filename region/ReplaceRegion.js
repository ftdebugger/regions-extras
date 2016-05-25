'use strict';

var AbstractRegion = require('./AbstractRegion');

/**
 * @class ReplaceRegion
 */
module.exports = AbstractRegion.createRegion({
    name: 'replace',

    attachHtml: function (view) {
        this.listenView(view);

        if (!this.$placeholder) {
            this.$placeholder = this.$el;
        }

        this.$el.replaceWith(view.$el);
        this.$el = view.$el;
        this.el = view.$el.get(0);
    },

    listenView: function (view) {
        this.listenToOnce(view, 'before:destroy', this._viewDestroy);
    },

    _viewDestroy: function () {
        var view = this.currentView;

        if (!view) {
            return;
        }

        this.stopListening(view);

        if (this.$placeholder) {
            this.$el.replaceWith(this.$placeholder);
            this.$el = this.$placeholder;
            this.el = this.$placeholder.get(0);

            this.$placeholder = null;
        }
    }

});
