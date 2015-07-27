(function () {
    'use strict';

    var RegionsExtras = require('../index'),
        Region = RegionsExtras.options.Marionette.Region,
        regionManager = require('./manager');

    /**
     * @class AbstractRegion
     */
    module.exports = Region.extend({}, {

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
