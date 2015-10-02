(function () {
    'use strict';

    var RegionsExtras = require('../index'),
        Region = RegionsExtras.options.Marionette.Region,
        regionManager = require('./manager');

    /**
     * @class AbstractRegion
     */
    module.exports = Region.extend({

        /**
         * @param {Marionette.View} view
         * @param {{}} options
         * @returns {*}
         */
        show: function (view, options) {
            view._parentView = this._parentView;
            return Region.prototype.show.call(this, view, options);
        }

    }, {

        /**
         * @param {object|{name: string}} instanceOptions
         * @param {object} staticOptions
         * @returns {*}
         */
        createRegion: function (instanceOptions, staticOptions) {
            var NewRegion = this.extend(instanceOptions, staticOptions);
            regionManager.registerRegion(instanceOptions.name, NewRegion);

            return NewRegion;
        }

    });

})();
